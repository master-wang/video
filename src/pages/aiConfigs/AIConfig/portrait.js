/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:14:52
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-03-27 14:51:40
 */
import React from 'react';
import Portrait from './components/portrait';
import { useRouter } from '@/hooks';

export default function (props) {
  const { match: { params: { id } } } = props;
  if (id) {
    return <Portrait />;
  }
  const { history } = useRouter();
  setTimeout(() => {
    history.replace('/aiConfig');
  }, 2000);
  return <></>;
}
