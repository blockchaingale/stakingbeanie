import React, { useEffect, useState } from 'react';
import style from '../../styles/components/Tokenomics.module.scss';
import '../../styles/All.css';
import { useAccount, useNetwork } from "wagmi";
import { readContract } from '@wagmi/core'
import TokenAbi from '../../config/TokenAbi.json'

const Tokenomics: React.FC<{}> = () => {
    const TokenAddress = "0xCe3BA2dA32f08C7dB21C099fdee2BebF974D27bd";     
    const [tokenAmount, setTokenAmount] = useState(0);
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();    
    useEffect(() => {
        const FetchStakingData = async () => {
          try {
            const tokenBalance = await readContract({ address: TokenAddress, abi: TokenAbi, functionName: 'balanceOf', args: [address] });
            setTokenAmount(Number(tokenBalance) / Math.pow(10, 18));
          } catch (e) {
            console.error(e)
          }
        }
        if (isConnected === true && chain?.id === 97 && address) {
          FetchStakingData();
        }
      }, [isConnected, address, chain])    
    return (
        <div className={style.tokenomics}>
            <div className={style.flex_container}>
                <div><h1>TOKENOMICS</h1></div>
                <div><img src="./assets/image/Beanie.png" alt="" className="JuryImg"/></div>
                <div><h1 className={style.burned}>LP: BURNED 🔥</h1></div>
                <div><h2 className={style.address}>{TokenAddress}</h2></div>
                <div className={style.swapinfo}>
                    <div className={style.swaps}><h2>BUY TAX {'0%'}</h2></div>
                    <div className={style.swaps}><h2>SUPPLY {tokenAmount}</h2></div>
                    <div className={style.swaps}><h2>{"SELL TAX 0%"}</h2></div>
                </div>
            </div>            
        </div>
    )
}

export default Tokenomics;