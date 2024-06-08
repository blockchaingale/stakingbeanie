import React from 'react';
import style from '../../styles/components/TheJury.module.scss';

const TheJury: React.FC<{}> = () => {
    return (
        <div className={style.jury}>
            <div className={style.flex_container}>
                <div>
                    <img src="./assets/image/sImg2.gif" alt="" className={style.JuryImg}/>
                </div>
                <div className={style.description}>
                    <h2>beanie's pledge</h2>
                    <br/>
                    <p style={{maxWidth:'500px', wordWrap:'break-word'}}>Standing for meme culture on chain! Join the Jury to hear Beanie’s Pledge while receiving a cheeky $BEAN for your service</p>
                    <br/>
                    <br/>
                    <a className={style.joinbtn} href="joinjury">JOIN THE JURY</a>
                </div>
            </div>
        </div>
    )
}

export default TheJury;