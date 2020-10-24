/* eslint-disable no-restricted-globals */
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
import { local } from './cache';

// 缓存正在请求的ajax
const pendings = [];

// 不需要权限拦截的请求
// eslint-disable-next-line no-unused-vars
const NO_AUTH_URLS = [
  '/login'
];

function goLogin() {
  local.clear();
  const href = `${location.href.indexOf('#') !== -1 ? '#' : ''}/user/login`;
  location.href = href;
}

const { REACT_APP_API_PREFIX } = process.env;
// 设置默认请求地址前缀
axios.defaults.baseURL = REACT_APP_API_PREFIX;

// 添加全局响应拦截器
axios.interceptors.response.use(({
  data: {
    code, message, data, detailMsg
  }
}) => {
  if (code === 200 || code === 0 || code === 1901) {
    return data;
  }
  // // 登陆超时，或用户没有群组 跳转登录
  // if (code === 101 || code === 515) {
  //   // todo
  //   return;
  // }
  if (code === 401) {
    goLogin();
  }
  return Promise.reject(detailMsg || message);
}, () => {
  goLogin();
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('服务器内部错误');
});

/**
 * 发起ajax请求
 * @param {string} url
 * @param {object} options
 */
function ajax(url, options) {
  // 暂时隐藏
  const accessToken = local.get('access_token');
  if (!accessToken && NO_AUTH_URLS.indexOf(url) === -1) {
    goLogin();
    return;
  }
  const method = (options.method || 'post').toLowerCase();
  const pending = `${url} ${method} ${JSON.stringify(options.data)}`;
  // for (let i = 0, len = pendings.length; i < len; i++) {
  //   if (pendings[i] === pending) {
  //     return Promise.reject(new Error('请求太频繁，请稍后再试'));
  //   }
  // }
  pendings.push(pending);
  const config = {
    url,
    method,
    baseURL: options.baseURL || REACT_APP_API_PREFIX,
    withCredentials: true,
    headers: options.headers || {}
  };
  if (['get', 'delete'].indexOf(method) > -1) {
    config.params = options.data;
    config.paramsSerializer = (params) => qs.stringify(params, { indices: false });
  } else {
    config.data = options.data;
  }
  // 暂时隐藏
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return axios(config)
    .catch((err) => Promise.reject(err))
    .finally(() => {
      setTimeout(() => {
        for (let i = 0, len = pendings.length; i < len; i++) {
          if (pendings[i] === pending) {
            pendings.splice(i, 1);
            break;
          }
        }
      }, 300);
    });
}

/**
 * 根据配置批量生成ajax请求
 * @param {object} config
 */
function genAjax(config) {
  const res = {};
  const { items } = config;
  for (let i = 0, len = items.length; i < len; i++) {
    res[items[i].key] = function (params) {
      let url = (items[i].prefix || config.prefix || '') + (items[i].url || '');
      let data = params;
      // 解析restful风格的请求，eg：/a/:b/:c
      if (/\/:/.test(url)) {
        const excludes = [];
        url = url.replace(/:([^/]+)/g, (match, p1) => {
          if (_.has(data, p1)) {
            excludes.push(p1);
            return data[p1];
          }
          return match;
        });
        data = _.omit(data, excludes);
      }

      return ajax(
        url,
        {
          data,
          baseURL: config.baseURL,
          ..._.omit(items[i], ['key', 'url', 'prefix'])
        }
      );
    };
  }
  return res;
}

export {
  ajax,
  genAjax
};
