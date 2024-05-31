import React from 'react';
import style from '../../styles/components/About.module.scss';

const About: React.FC<{}> = () => {
    return (
        <div className={style.about}>
            <div className={style.flex_container}>
                <div>
                    <img src="./assets/image/Beanie1.png" alt="" className="JuryImg"/>
                </div>
                <div className={style.description}>
                    <h4>Introducing</h4>
                    <h1>$beanie</h1>
                    <p>While some say do it for the meme,<br/> Beanie says do it for the $BEAN</p>
                    <span>
                        <br/>
                        <img src="./assets/image/telegram.png" alt="telegram"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="./assets/image/twitter.png" alt="twitters"/>
                    </span>
                </div>
            </div>
            <h2 className={style.network}>The digital advocate of the BASE network</h2>
            <br/>
            <hr style={{color: 'white'}}/>
        </div>
    )
}

export default About;