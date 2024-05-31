import React from 'react';
import style from "../../styles/components/layouts/NavBar.module.scss";

const Header: React.FC<{}> = props => {
  return (
      <div className={style.flex_container}>
          <div className={style.flex_left}>
            <h1 className={style.beanie}>$BEANIE</h1>
          </div>
          <div>
            <ul className={style.nav}>
              <li className={style.item}><a id="navitem" className={style.linktext} href="#About">about</a></li>
              <li className={style.item}><a id="navitem" className={style.linktext} href="#TheJury">the jury</a></li>
              <li className={style.item}><a id="navitem" className={style.linktext} href="#Tokenomics">tokenomics</a></li>
              <li className={style.item}><a id="navitem" className={style.linktext} href="#Drop">game</a></li>
            </ul>
          </div>
          <div className={style.flex_right}>
            <button className={style.buybtn}>Buy $BEAN</button>
          </div>
        </div>
  )
};

export default Header;