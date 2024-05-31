import React, {useEffect, useState} from "react";
import { useAccount, useNetwork } from "wagmi";
import style from '../../styles/components/layouts/JoinJuryPage.module.scss';
import Input from '../Input.tsx';
import "../../styles/StakingContainer.css";
import TokenAbi from '../../config/TokenAbi.json'
import StakingAbi from '../../config/StakingAbi.json'
import '../../App.css'
import { waitForTransaction, readContract, writeContract } from '@wagmi/core'
import ClipLoader from "react-spinners/ClipLoader";

const JoinJuryPage = () => {
    const [tokenAmount, setTokenAmount] = useState(0);
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();

    const [allowance, setAllowance] = useState(0);    
    const [tokenBalance, setTokenBalance] = useState(0)
    const [maxBalance, setMaxBalance] = useState(0);
    const [maxSet, setMaxSet] = useState(0);    
    const [userAmount, setUserAmount] = useState(0);
    const [tvl, setTvl] = useState(0);
    const [apy, setApy] = useState(0);
    const [userPendingRewards, setUserPendingRewards] = useState(0);   
    const [lockingEnabled, setLockingEnabled] = useState(false);
    // const [userlockingTime, setUserLockingTime] = useState(0);
    // const [lockingduration, setLockingDuration] = useState(0);
    const [userdisablelockingTime, setDisableUnlockingTime] = useState(new Date());
    const [userenableunlockingTime, setEnableUnlockingTime] = useState(new Date());
    let [confirming, setConfirming] = useState(false);

    const StakingAddress = "0xF4a03609CE2bD5a12EC20f8427D205867A799887";
    const TokenAddress = "0x24DE1F3f25b1Cdb054A4562b72B4f8f5C36A53bf";    
    
    useEffect(() => {
        const FetchStakingData = async () => {
          try {
            const totalInfo = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'totalInfo', args: [address, '1'] });
            const tokenAllowance = await readContract({ address: TokenAddress, abi: TokenAbi, functionName: 'allowance', args: [address, StakingAddress] });
            const tokenAmount = await readContract({ address: TokenAddress, abi: TokenAbi, functionName: 'balanceOf', args: [address] });
            const lockingTime = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'userLockingTime', args: [address]});
            const duration = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'lockingTime'});
            const rewardPerYear = Number(totalInfo[1]) * 60 * 60 * 24 * 365;
            const APY = ((rewardPerYear / (Number(totalInfo[0]))) + 1) * 100
            setApy(APY);
            setTvl(Number(totalInfo[0]) / Math.pow(10, 18));
            setUserAmount(Number(totalInfo[2]) / Math.pow(10, 18));
            setUserPendingRewards(Number(totalInfo[3]) / Math.pow(10, 18));
            setLockingEnabled(totalInfo[4]);
            setAllowance(Number(tokenAllowance) / Math.pow(10, 18));
            setTokenBalance(tokenAmount);
            setMaxBalance(tokenAmount);
            // setUserLockingTime(lockingTime);
            // setLockingDuration(duration);
            const lockTime = Number(lockingTime);
            const dura = Number(duration);            
            let d = new Date((lockTime + dura) * 1000);
            setDisableUnlockingTime(d);
            d = new Date((lockTime + dura + 86400) * 1000);
            setEnableUnlockingTime(d);
          } catch (e) {
            console.error(e)
          }
        }
        if (isConnected === true && chain?.id === 97 && address && (confirming === false)) {
          FetchStakingData();
        }
      }, [isConnected, address, chain, confirming])
    
    const setMaxAmount = async () => {
        setTokenAmount(Number(tokenBalance) / Math.pow(10, 18));
        setMaxSet(maxBalance);
    };    

    const onTokenClaim = async () => {
        try {
            setConfirming(true);
          const claim = await writeContract({
            address: StakingAddress,
            abi: StakingAbi,
            functionName: 'claim',
            args: [1],
            account: address
          })
          const claimData = await waitForTransaction({
            hash: claim.hash
          })
         console.log('claimData', claimData)
          setTimeout(function () {
              setConfirming(false);
          }, 3000)
        } catch (err) {
            setConfirming(false);
        }
    };

    const onTokenAllowance = async () => {
        try {
            setConfirming(true);
          const approve = await writeContract({
            address: TokenAddress,
            abi: TokenAbi,
            functionName: 'approve',
            args: [StakingAddress, tokenBalance],
            account: address
          })
          const approveData = await waitForTransaction({
            hash: approve.hash
          })
          console.log('approveData', approveData)
          setTimeout(function () {
              setConfirming(false);
          }, 3000)
          setMaxSet(0);
        } catch (err) {
            setConfirming(false);
          setMaxSet(0);
        }
      };

    const onTokenStake = async (tokenAmounts) => {
        try {
            setConfirming(true);
          let TokenAmounts;
          if (Number(maxSet) === 0) {
            TokenAmounts = `0x${(Number(tokenAmounts) * (10 ** 18)).toString(16)}`;
          } else {
            TokenAmounts = maxSet;
          }
          const deposit = await writeContract({
            address: StakingAddress,
            abi: StakingAbi,
            functionName: 'deposit',
            args: [TokenAmounts, 1],
            account: address
          })
          const depositData = await waitForTransaction({
            hash: deposit.hash
          })
         console.log('depositData', depositData)
          setMaxSet(0);
          setTimeout(function () {
             setConfirming(false);
          }, 3000)
        } catch (err) {
            setMaxSet(0);
            setConfirming(false);
        }
    };    
    const onTokenWithdraw = async () => {
        try {
            setConfirming(true);
          const withdraw = await writeContract({
            address: StakingAddress,
            abi: StakingAbi,
            functionName: 'withdrawAll',
            args: [1],
            account: address
          })
          const withdrawData = await waitForTransaction({
            hash: withdraw.hash
          })
          console.log('withdrawData', withdrawData)
          setTimeout(function () {
              setConfirming(false);
          }, 3000)
        } catch (err) {
            setConfirming(false);
        }
    };    
    return (
        <div style={{padding: '30px'}}>
            <div className={style.JoinJuryPage}>
                <div className={style.JoinJuryPageHeader}>
                    <h3>JOIN THE JURY (30 Day Lock)</h3>
                </div>
                <div className={style.Staking}>
                    <div className={style.StakingInfo}>
                        <p>TVL : &nbsp; <span>{tvl.toFixed(2)} Test</span> &emsp;  &emsp; &emsp;
                        $&nbsp; <span>{Number(apy).toFixed(2)} k</span></p>
                    </div>
                    <div className={style.StakingInfo}>
                        <p>Your Staked Amount: &emsp;&emsp;&emsp;<span>{userAmount} Test</span></p>
                    </div>
                    <div className={style.StakingInfo}>
                        <p>Pending Reward Amount: &emsp;&emsp;&emsp;<span>{userPendingRewards.toFixed(5)} Test</span></p>
                    </div>      
                    <div className={style.StakingInfo}>
                        <p>Lock Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span>
                        {userdisablelockingTime.toJSON().slice(0,10).split('-').reverse().join('/')}</span></p>  
                    </div>         
                    <div className={style.StakingInfo}>
                        <p>Unlock Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span>
                        {userenableunlockingTime.toJSON().slice(0,10).split('-').reverse().join('/')}</span></p>  
                    </div>                              
                </div>            
                <div className={style.flex_container}>
                    <div>
                        <section className='inputPanel'>
                            <p className="inputPrefix">Amount : </p>
                            <Input
                                placeholder="Enter amount"
                                label=""
                                type="number"
                                changeValue={setTokenAmount}
                                value={tokenAmount}
                            />
                            <p onClick={() => setMaxAmount()} className="MaxButton">Max</p>
                        </section>  
                    </div>
                    <div>{
                        Number(tokenAmount) > Number(allowance) ?
                        <section className="LockBox">
                            {confirming === false ?
                                Number(tokenBalance) > 0 ?
                                <>
                                        <p className='Text1'>Please approve Test Token first</p>
                                        <button disabled={confirming === false ? false : true} onClick={() => onTokenAllowance()} className="LockButton">
                                        <p>Allow</p>
                                        </button>
                                    </>
                                    :
                                    <p className='Text1'>You have no tokens now</p>
                                    :
                                    <>
                                    <ClipLoader
                                        color={'#36d7b7'}
                                        loading={confirming}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </>
                            }
                        </section>    
                        :                  
                        <section className="claimBox">
                            <button disabled={tokenAmount > 0 ? false : true} onClick={() => onTokenStake(tokenAmount)} className="LockButton">Stake $BEAN</button>
                            {Number(userPendingRewards) > 0 ?
                            <button disabled={false} onClick={onTokenClaim} className="LockButton">Claim $BEAN</button>
                            :
                            <></>
                            }
                            {Number(userAmount) > 0 ?
                            <button disabled={lockingEnabled === true ? false : true} onClick={() => onTokenWithdraw()} className="LockButton">Withdraw $BEAN</button>
                            :
                            <></>
                            }
                        </section>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinJuryPage;