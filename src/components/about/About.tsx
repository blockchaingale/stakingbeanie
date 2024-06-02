import React from 'react';
import style from '../../styles/components/About.module.scss';

const About: React.FC<{}> = () => {
    return (
        <div className={style.about}>
            <div className={style.flex_container}>
                <div>
                    <img src="./assets/image/Beanie1.png" alt="" className={style.JuryImg}/>
                </div>
                <div className={style.description}>
                    <h4>Introducing</h4>
                    <h1>$beanie</h1>
                    <p>While some say do it for the meme,<br/> Beanie says do it for the $BEAN</p>
                    <span>
                        <br/>
                        <a href="https://t.me/BasedBeanie"><img src="./assets/image/telegram.png" alt="telegram" className={style.icon}/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://x.com/basebeanie?t=2hr9F5pVCVzAO-9p1CMonQ&s=09"><img src="./assets/image/twitter.png" alt="twitters" className={style.icon}/></a>
                    </span>
                </div>
            </div>
            <h2 className={style.network}>The Blue suited advocate of the BASE chain</h2>
            <br/>
            <hr style={{color: 'white'}}/>
            <br/>
            <br/>
        </div>
    )
}

export default About;