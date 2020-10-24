import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import { Menu, Dropdown } from 'antd';
import SvgIcon from '@/components/Icon/Svg';
import { useRouter } from '@/hooks';
import style from './Menu.module.less';

const { Item } = Menu;

const Menus = inject('app')(observer(({
  app: {
    routeMap,
    menus
  }
}) => {
  const { pathname } = useRouter();
  const parentPaths = _.get(routeMap[pathname], 'parentPaths', []);
  const activePath = parentPaths.length > 0 ? parentPaths[0] : pathname;
  const getMenuChirld = (arr) => (
    <Menu>
      {
        arr.map((item) => (
          <Item key={item.id}>
            <Link className="menu-link" to={item.path}>
              {item.name}
            </Link>
          </Item>
        ))
      }
    </Menu>
  );
  return (
    <ul className={style.menu}>
      {menus.map(item => {
        const { isDropMenu = false, children = [] } = item;
        return isDropMenu ? <Dropdown
          overlay={getMenuChirld(children)}
          key={item.id}
          trigger={['click']}
          className={style['drop-menu-wrap']}
        >
          <li
            className={[
              'menu-item',
              item.path === activePath ? 'menu-item-active' : undefined
            ].join(' ')}
          >
            <div className="menu-link">
              <div className="menu-icon">
                <SvgIcon name={item.icon} />
              </div>
              <div className="menu-name">
                {item.name}
              </div>
            </div>
          </li>
        </Dropdown>
          : (
            <li
              key={item.id}
              className={[
                'menu-item',
                item.path === activePath ? 'menu-item-active' : undefined
              ].join(' ')}
            >
              <Link className="menu-link" to={item.path}>
                <div className="menu-icon">
                  <SvgIcon name={item.icon} />
                </div>
                <div className="menu-name">
                  {item.name}
                </div>
              </Link>
            </li>
          );
      })}
    </ul>
  );
}));

export default Menus;
