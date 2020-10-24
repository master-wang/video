import React from 'react';
import { Tooltip } from 'antd';

const strlen = (str) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};

/**
 * @string title 提示的文案
 * @number limit 限制的文字长度 default = 26,按照英文的长度，中文一个字符占两个长度
 */
export default function ({ title, limit = 26 }) {
  return (title && strlen(title) > limit ? <Tooltip title={title}>
    {`${title.slice(0, limit)}...`}
  </Tooltip> : title);
}
