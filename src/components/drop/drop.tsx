import React from 'react';
import style from '../../styles/components/Drop.module.scss';

const Drop: React.FC<{}> = () => {
    return (
        <div className={style.dropcontent}>     
            <div>
                <div className={style.flex_container}>           
                    <div><hr/></div>
                    <div><h1>BEANIE DROP</h1></div> 
                    <div><hr/></div>
                </div>   
                <div className={style.line}></div>                
            </div> 
            <div className={style.drop}>
                <div className={style.flex_container}>      
                    <iframe src="https://flappycreator.com/flappy.php?id=665df5272a85b" name="birdgame" className={style.imagepose}></iframe>
                    {/* <a href="https://flappycreator.com/share.php?id=665df5272a85b"><img alt="birdgame" src="./assets/image/game.jpg" width="100%"/></a> */}
                    {/* <div className={style.imagepose}></div> */}
                    {/* <div className={style.otherpose}></div> */}
                </div>
            </div>
        </div>
    )
}

export default Drop;