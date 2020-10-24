import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Info from './Info';
import style from './index.module.less';

function Header() {
  return (
    <div className={style.header}>
      <div className="hd-l">
        <Logo />
      </div>
      <div className="hd-m">
        <Menu />
      </div>
      <div className="hd-r">
        <Info />
      </div>
    </div>
  );
}

export default Header;
