import React from 'react';
import style from './Logo.module.less';

const Logo = function () {
  return (
    <div className={style.logo}>
      <img src={require('@/images/logo_bigV.png')} alt="logo" />
    </div>
  );
};

export default Logo;
