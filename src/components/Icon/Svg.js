import React from 'react';
import style from './Svg.module.less';

function Svg({
  name,
  className
}) {
  className = [`svg-icon-${name}`, style['svg-icon'], className].join(' ');
  const linkHref = `#svg-icon-${name}`;
  return (
    <svg className={className}>
      <use xlinkHref={linkHref}></use>
    </svg>
  );
}

export default Svg;
