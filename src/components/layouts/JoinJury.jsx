import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import style from '../../styles/components/layouts/JoinJury.module.scss';
import JoinJuryPage from '../Joinjury/JoinJuryPage';

const JoinJury = () => {
    const [Connect, setConnect] = useState(false);
    const { address, isConnected } = useAccount();
    const { open } = useWeb3Modal();
    const { chain } = useNetwork();

    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

    const onConnect = async () => {
      await open();
    };

    const onConnectWallet = async () => {
        await open();
        setConnect(true);
    }

    useEffect(() => {
        const switchChain = async () => {
          try {
            switchNetwork?.(8453)
          } catch (e) {
            console.error(e)
          }
        }
        if (isConnected === true) {
          if (chain?.id !== 8453)
            switchChain();
        }
    }, [isConnected, chain?.id, switchNetwork])

    useEffect(() => {
        const reloadWindow = async () => {
          try {
            window.location.reload();
          } catch (e) {
            console.error(e)
          }
        }
        if (isConnected === true && Connect === true)
          reloadWindow();
    }, [isConnected, Connect])

    return (
      <>

      { !isConnected ?
        <div className={style.flex_container}>
            <div className={style.backbtn}>
                <a href="/">Back</a>
            </div>
            <div className={style.enter}>
                <h2>ENTER APP</h2>
                <br/>
            </div>
            <div>
            { !isConnected ?
                <>
                    <button className={style.joinbtn} type="submit" onClick={() => {
                        onConnectWallet();
                    }}>#DOITFORTHEBEAN</button>
                </>
                :
                <section className={style.ConnectWalletSection}>
                    {chain?.id === 8453 ?
                        <button
                            className={style.joinbtn} type="submit"
                            onClick={() => onConnect()}
                        >
                            {address.slice(0, 5) + '...' + address.slice(-5)}
                        </button>
                        :
                        <button
                            className={style.joinbtn} type="submit"
                            onClick={() => switchNetwork?.(8453)}
                        >
                            {'#DOIT'}
                            {isLoading && pendingChainId === 5 && ' (switching)'}
                        </button>
                    }
                </section>
            }
            </div>
        </div>
        : <JoinJuryPage/>
      }
      </>
    );
}

export default JoinJury;