import React, { useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import styles from "../styles/container/Container.module.scss";
import mainLogo from "../icons/header.png";
import AddLogo from "../icons/Add.png";
import BuyLogo from "../icons/buy.png";
import LiveLogo from "../icons/Live.png";

const Header = () => {
    const { address, isConnected } = useAccount();
    const { open } = useWeb3Modal();
    const [firstConnect, setFirstConnect] = useState(false);
    const onConnect = async () => {
        await open();
    };
    const onConnectWallet = async () => {
        await open();
        setFirstConnect(true);
    };
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { chain } = useNetwork();

    useEffect(() => {
        const reloadWindow = async () => {
            try {
                window.location.reload();
            } catch (e) {
                console.error(e)
            }
        }
        if (isConnected === true && firstConnect === true)
            reloadWindow();
    }, [isConnected, firstConnect])

    useEffect(() => {
        const switchChain = async () => {
            try {
                switchNetwork?.(11155111)
            } catch (e) {
                console.error(e)
            }
        }
        if (isConnected === true) {
            if (chain.id !== 11155111)
                switchChain();
        }
    }, [isConnected, chain, switchNetwork])

    return (
        <div className={styles.HeaderBox}>
            <div className={styles.HeaderContainer}>
                <div className={styles.HeaderContainer}>
                    <section className={styles.BalanceSection}>
                        <img src={mainLogo} alt="logo" />
                    </section>
                    <section className={styles.ButtonContainer}>
                        <div className={styles.connectButtonBox}>
                            {!isConnected ?
                                <>
                                    <button className="ConnectButton" type="submit" onClick={() => {
                                        onConnectWallet();
                                    }}>Enter App / Connect</button>
                                </>
                                :
                                <section className={styles.ConnectWalletSection}>
                                    {chain?.id === 11155111 ?
                                        <button
                                            className="ConnectButton" type="submit"
                                            onClick={() => onConnect()}
                                        >
                                            {address.slice(0, 5) + '...' + address.slice(-5)}
                                        </button>
                                        :
                                        <button
                                            className="ConnectButton" type="submit"
                                            onClick={() => switchNetwork?.(11155111)}
                                        >
                                            {'To Sepolia'}
                                            {isLoading && pendingChainId === 5 && ' (switching)'}
                                        </button>
                                    }
                                </section>
                            }
                        </div>
                    </section>
                </div>
            </div>

            <div className={styles.HeaderContent}>
                <img src={BuyLogo} alt="" className={styles.headerlogo} />
                <img src={LiveLogo} alt="" className={styles.headerlogo} />
                <img src={AddLogo} alt="" className={styles.headerlogo} />
            </div>
        </div>
    );
};

export default Header;