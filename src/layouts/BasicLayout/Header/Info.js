/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Menu, Dropdown, Button, message
} from 'antd';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import { local } from '@/utils/cache';
import style from './Logo.module.less';
import appStore from '@/stores/app';
import _api from '../../../pages/login/services';

export default observer(() => {
  useMount(async () => {
    // 先隐藏;
    try {
      const res = await _api.getContext();
      appStore.update({
        loginInfo: res
      });
    } catch (msg) {
      message.error(msg || '服务异常！');
    }
  });
  const logout = async () => {
    try {
      await _api.logout();
      local.clear();
      _api.getContext();
    } catch (msg) {
      message.error(msg || '服务异常！');
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={logout}>
        <a>注销</a>
      </Menu.Item>
    </Menu>
  );
  const { loginInfo } = appStore;
  return (
    <div className={style.info}>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          { loginInfo ? loginInfo.userName : ''}
        </a>
      </Dropdown>
    </div>
  );
});
