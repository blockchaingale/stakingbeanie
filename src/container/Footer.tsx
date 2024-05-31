import React from 'react';
import style from '../styles/components/Footer.module.scss';

const Footer: React.FC<{}> = () => {
    return (
        <div>     
            <div>
                <div className={style.flex_container}>            
                    <h1 className={style.footername}>#DOITFORTHEBEAN</h1>   
                </div>   
                <div className={style.line}></div>                
            </div> 
            <div className={style.footer}>
                <div className={style.flex_container}>      
                    <div><img src="./assets/image/twitter.png" alt="telegram"/></div>
                    <div><img src="./assets/image/telegram.png" alt="telegram"/></div>
                    <div><h1 style={{fontSize:'10vw'}}>BASEDBEANIE</h1></div>
                    <div><p style={{textAlign:'center'}}>$BEANIE is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. <br/>
                        The coin is completely useless and for entertainment purposes only © 2024 by $BEANIE. All rights reserved!</p></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;