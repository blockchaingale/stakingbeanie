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
                    <div><a href="http://web.telegram.org"><img src="./assets/image/twitter.png" alt="telegram" width='150%'/></a></div>
                    <div><a href="http://www.twitter.com"><img src="./assets/image/telegram.png" alt="twitters" width='150%'/></a></div>
                    <div><h1 style={{fontSize:'10vw'}}>BASEDBEANIE</h1></div>
                    <div><p style={{textAlign:'center'}}>$BEANIE is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. <br/>
                        The coin is completely useless and for entertainment purposes only © 2024 by $BEANIE. All rights reserved!</p></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;