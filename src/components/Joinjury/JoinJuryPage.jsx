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
    const [apy, setApy] = useState(100.0);
    const [err, setError] = useState("");
    const [userPendingRewards, setUserPendingRewards] = useState(0);   
    const [lockingEnabled, setLockingEnabled] = useState(false);
    const [lockTime, setLockTime] = useState(0);
    // const [userlockingTime, setUserLockingTime] = useState(0);
    // const [lockingduration, setLockingDuration] = useState(0);
    const [userdisablelockingTime, setDisableUnlockingTime] = useState(new Date());
    const [userenableunlockingTime, setEnableUnlockingTime] = useState(new Date());
    let [confirming, setConfirming] = useState(false);

    const StakingAddress = "0x6a4Ebc3a65856876342a681214e81e8943598848";
    const TokenAddress = "0xCa9a874173fd562d4287A33a9455836885869e41";    
    
    useEffect(() => {
        const FetchStakingData = async () => {
          try {
            const totalInfo = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'totalInfo', args: [address, '1'] });
            const tokenAllowance = await readContract({ address: TokenAddress, abi: TokenAbi, functionName: 'allowance', args: [address, StakingAddress] });
            const tokenAmount = await readContract({ address: TokenAddress, abi: TokenAbi, functionName: 'balanceOf', args: [address] });
            const lockingTime = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'userLockingTime', args: [address]});
            const duration = await readContract({ address: StakingAddress, abi: StakingAbi, functionName: 'lockingTime'});
            const rewardPerYear = Number(totalInfo[1]) * 60 * 60 * 24 * 365;
            const APY = ((rewardPerYear / (Number(totalInfo[0])))) * 100;
            setApy(APY ? APY : 0.0);
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
            setLockTime(lockTime);
            setDisableUnlockingTime(d);
            d = new Date((lockTime + dura + 86400) * 1000);
            setEnableUnlockingTime(d);
          } catch (e) {
            console.error(e)
          }
        }
        if (isConnected === true && chain?.id === 11155111 && address && (confirming === false)) {
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
            if(Number(tokenAmounts) <= 0)throw "Please enter your Test Token Amount now!";
            if(Number(tokenBalance) === 0)throw "You have no tokens now";
            setError("");
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
            setError(err);
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
                <div className={style.backbtn}>
                    <a href="/">Back</a>
                </div>
                <div className={style.Staking}>
                  {/* <div className={style.StakingData}>
                      <div className={style.stakingLeft}>TVL :</div>
                      <div className={style.stakingMiddle}></div>
                      <div className={style.stakingRight}>{tvl.toFixed(2)} Test</div>
                  </div>
                  <div className={style.StakingData}>
                      <div className={style.stakingLeft}>APY :</div>
                      <div className={style.stakingMiddle}></div>
                      <div className={style.stakingRight}>{Number(apy).toFixed(2)} %</div>
                  </div> */}
                  <div className={style.StakingData}>
                      <div className={style.stakingLeft}>Your Staked Amount:</div>
                      <div className={style.stakingMiddle}></div>
                      <div className={style.stakingRight}>{userAmount} Test</div>
                  </div>
                  <div className={style.StakingData}>
                      <div className={style.stakingLeft}>Pending Reward Amount:</div>
                      <div className={style.stakingMiddle}></div>
                      <div className={style.stakingRight}>{userPendingRewards.toFixed(5)} Test</div>
                  </div>   
                      <div className={style.StakingData} style={{visibility: lockTime > 0 ? 'visible' : 'hidden'}}>
                          <div className={style.stakingLeft}>Lock Date:</div>
                          <div className={style.stakingMiddle}></div>
                          <div className={style.stakingRight}>{userdisablelockingTime.toJSON().slice(0,10).split('-').reverse().join('/')}</div>
                      </div>
                      <div className={style.StakingData} style={{visibility: lockTime > 0 ? 'visible' : 'hidden'}}>
                          <div className={style.stakingLeft}>Unlock Date:</div>
                          <div className={style.stakingMiddle}></div>
                          <div className={style.stakingRight}>{userenableunlockingTime.toJSON().slice(0,10).split('-').reverse().join('/')}</div>
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
                       {(Number(tokenAmount) > Number(allowance) & Number(tokenBalance) !== 0) ?
                        <section className="LockBox">
                            {confirming === false ?
                                <>
                                    <p className='Text1'>Please approve Test Token first</p>
                                    <button disabled={confirming === false ? false : true} onClick={() => onTokenAllowance()} className="LockButton">
                                    Approve Staking
                                    </button>
                                </>
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
                        <>
                        <section>
                        {err?<p className="Text1" style={{textAlign:'center'}}>{err}</p>:<></>}                        
                        </section>                        
                        <section className="claimBox">
                          {confirming === false ?
                            <>
                                <button onClick={() => onTokenStake(tokenAmount)} className="LockButton">Stake $BEAN</button>
                                {Number(userPendingRewards) > 0 ?
                                  <button disabled={false} onClick={onTokenClaim} className="LockButton">Claim $BEAN</button>
                                  :
                                  <></>
                                }
                                {Number(userAmount) > 0 ?
                                  <button disabled={lockingEnabled === true ? false : true} onClick={() => onTokenWithdraw()} className="LockButton">Withdraw $BEAN</button>
                                  :
                                  <>
                                  </>
                                } 
                            </>:
                            <ClipLoader
                            color={'#36d7b7'}
                            loading={confirming}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            />                            
                          }
                        </section>    
                        </>            
                    }
                </div>
            </div>
        </div>
    );
}

export default JoinJuryPage;