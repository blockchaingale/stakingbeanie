import React from 'react';
import style from "../styles/components/layouts/NavBar.module.scss";

const Header: React.FC<{}> = () => {

  return (
      <div className={style.headercontent}>
        <div className={style.flex_container}>
            <div className={style.flex_left}>
              <h1 className={style.beanie}>$BEANIE</h1>
            </div>
          
            <div className={style.flex_middle}>   
                <div className={style.flex_rightf}>
                  <a className={style.buybtn} href="https://app.uniswap.org/"><i className="fa fa-shopping-cart"/></a>    
                  &nbsp;&nbsp;
                </div>       
                <div className={style.flex_main}>
                  <input className={style.menu_toggle} id ="menu-toggle" type="checkbox" />
                  <label className={style.menu_button_container} htmlFor="menu-toggle">
                    <div className={style.menu_button}></div>
                  </label>              
                  <ul className={style.nav}>
                    <li className={style.item}><a className={style.linktext} href="#About">about</a></li>
                    <li className={style.item}><a className={style.linktext} href="#TheJury">Stake</a></li>
                    <li className={style.item}><a className={style.linktext} href="#Tokenomics">tokenomics</a></li>
                    <li className={style.item}><a className={style.linktext} href="#Drop">game</a></li>
                  </ul>           
                </div>                
            </div>
            <div className={style.flex_right}>
              <a className={style.buybtn} href="https://app.uniswap.org/">Buy $BEAN</a>
            </div>

          </div>
        </div> 
  )
};

export default Header;