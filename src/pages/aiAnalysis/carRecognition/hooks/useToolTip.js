import React from 'react';
import { Tooltip } from 'antd';

/**
 * @string title 提示的文案
 * @number limit 限制的文字长度 default = 26
 */
export default function ({ title, limit = 26 }) {
  return (title && title.length > limit ? <Tooltip title={title}>
    {`${title.slice(0, limit)}...`}
  </Tooltip> : title);
}
