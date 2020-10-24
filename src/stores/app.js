/* eslint-disable no-unused-vars */
import loadable from '@loadable/component';
import _ from 'lodash';
import { merge } from '@/decorators/store';
import ROUTES from '@/routes/config';

const genUid = (function () {
  let uid = 1;
  return function () {
    return uid++;
  };
}());

function dynamicImport(Comp) {
  return loadable(Comp);
}

/**
 * 将路由数据转换为菜单
 * @param {array} routes
 */
function routeToMenu(routes) {
  const { HIDE, HIDE_CHILDREN } = CST.ROUTE_MENU_STATUS;
  const excludeKeys = ['routes', 'component'];
  function filter(data = []) {
    return data.reduce((prev, curr) => {
      if (curr.status === HIDE || curr.redirect) {
        return prev;
      }
      if (curr.status === HIDE_CHILDREN || !curr.routes || !curr.routes.length) {
        return prev.concat(_.omit(curr, excludeKeys));
      }
      const children = filter(curr.routes);
      if (children.length) {
        return prev.concat({ children, ..._.omit(curr, excludeKeys) });
      }
      return prev.concat(_.omit(curr, excludeKeys));
    }, []);
  }
  return filter(routes);
}

/**
 * 路由数据处理
 * @param {array} routes
 */
function routeProcess(routes) {
  // 添加默认重定向处理
  function redirect(data = []) {
    let indexItem = null;
    let rootItem = null;
    let rootIndex = -1;
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].path === '/') {
        rootItem = data[i];
        rootIndex = i;
        break;
      }
      if (data[i].index) {
        indexItem = data[i];
        break;
      }
    }
    // 将path为'/'的路由移动到数组最后
    if (rootIndex > -1) {
      if (data.length === 1) {
        return;
      }
      data.splice(rootIndex, 1);
      data.push(rootItem);
      return;
    }
    // 未设置，默认跳转到第一个子路由
    indexItem = indexItem || data[0];
    data.push({
      exact: false,
      redirect: indexItem.path
    });
  }

  redirect(routes);

  // 格式化原始路由数据，添加一些辅助信息，并生成map对象
  const routeMap = {};
  function format(data, parent) {
    data.forEach(item => {
      item.id = genUid();
      if (item.component) {
        item.component = dynamicImport(item.component);
      }
      if (parent && !parent.layout) {
        item.parentPaths = [...(parent.parentPaths || []), parent.path];
      }
      if (!item.redirect && item.path) {
        routeMap[item.path] = item;
      }
      if (item.routes && item.routes.length) {
        if (item.layout || !item.component) {
          redirect(item.routes);
        }
        format(item.routes, item);
      }
    });
  }
  format(routes);

  // 将原始路由数据转换为array形式，将layout下的子路由展平
  function toArr(data) {
    return data.reduce((prev, { routes: children, ...rest }) => {
      if (!children || !children.length) {
        return prev.concat(rest);
      } if (rest.layout) {
        return prev.concat({ ...rest, routes: toArr(children) });
      }
      return prev.concat(rest, ...toArr(children));
    }, []);
  }
  const routeArr = toArr(routes);
  const menus = routeToMenu(_.get(routeMap['/'], 'routes'));
  return { routeArr, routeMap, menus };
}

const DEFAULTS = {
  // 路由Array
  routeArr: [],
  // 路由Map
  routeMap: {},
  // 顶部菜单
  menus: [],
  // 登陆信息
  loginInfo: {}
};

/**
 * 全局store
 */
@merge(DEFAULTS)
class App {
  constructor() {
    this.init();
    Object.assign(this, routeProcess(ROUTES));
  }
}

export default new App();
