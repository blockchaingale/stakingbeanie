import React from 'react';
import style from '../../styles/components/Drop.module.scss';

const Drop: React.FC<{}> = () => {
    return (
        <div className={style.dropcontent}>     
            <div>
                <div className={style.flex_container}>            
                    <h1>BEANIE DROP</h1>   
                </div>   
                <div className={style.line}></div>                
            </div> 
            <div className={style.drop}>
                <div className={style.flex_container}>      
                    <div className={style.imagepose}></div>
                    <div className={style.otherpose}></div>
                </div>
            </div>
        </div>
    )
}

export default Drop;