import React from 'react';
import { Link } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Breadcrumb } from 'antd';
import _ from 'lodash';
import { useRouter } from '@/hooks';
import style from './Bread.module.less';

const { Item: BreadcrumbItem } = Breadcrumb;

export default inject('app')(observer(({
  app: {
    routeMap
  },
  items = []
}) => {
  const { pathname } = useRouter();
  if (!items.length) {
    const currentRoute = toJS(routeMap[pathname]);
    const { parentPaths } = currentRoute;
    parentPaths.forEach(path => {
      items.push({
        ..._.pick(routeMap[path], ['id', 'name', 'path'])
      });
    });
    items.push({
      ..._.pick(currentRoute, ['id', 'name'])
    });
  }
  return (
    <Breadcrumb className={style.wrap}>
      {
        items.map((item, index) => (
          <BreadcrumbItem key={item.id || item.path || index}>
            {
              item.path
                ? <Link to={item.path}>
                  {item.name}
                </Link>
                : <span>{item.name}</span>
            }
          </BreadcrumbItem>
        ))
      }
    </Breadcrumb>
  );
}));
