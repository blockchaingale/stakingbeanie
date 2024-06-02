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
                    <div><a href="https://t.me/BasedBeanie"><img src="./assets/image/twitter.png" alt="telegram"/></a></div>
                    <div><a href="https://x.com/basebeanie?t=2hr9F5pVCVzAO-9p1CMonQ&s=09"><img src="./assets/image/telegram.png" alt="twitters"/></a></div>
                    <div><h1 className={style.footertitle}>BASEDBEANIE</h1></div>
                    <div><p style={{textAlign:'center'}} className={style.comment}>$BEANIE is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. <br/>
                        The coin is completely useless and for entertainment purposes only © 2024 by $BEANIE. All rights reserved!</p></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;