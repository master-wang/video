import React from 'react';
import { Icon } from 'antd';
import SvgIcon from './Svg';

/**
 * type: 图标类型，默认使用antd自带图标
 * name: 图标名称
 */
function Index({
  type,
  name,
  ...rest
}) {
  if (type === 'svg') {
    return <SvgIcon name={name} {...rest} />;
  }
  return <Icon type={name} {...rest} />;
}

export default Index;

export {
  SvgIcon
};
