import React from 'react';
import style from '../../styles/components/TheJury.module.scss';

const TheJury: React.FC<{}> = () => {
    return (
        <div className={style.jury}>
            <div className={style.flex_container}>
                <div>
                    <img src="./assets/image/Beanie2.png" alt="" className={style.JuryImg}/>
                </div>
                <div className={style.description}>
                    <h2>beanie's pledge</h2>
                    <br/>
                    <p style={{maxWidth:'500px', wordWrap:'break-word'}}>Join the Jury in stand for meme culture on chain! Hear BEANIE'S Pledge and receive a cheeky $BEAN for your services</p>
                    <br/>
                    <br/>
                    <a className={style.joinbtn} href="JoinJury">JOIN THE JURY</a>
                </div>
            </div>            
        </div>
    )
}

export default TheJury;