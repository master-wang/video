const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(proxy('/videobigdata', {
  //   target: 'http://dev-platform.urban-computing.cn',
  //   changeOrigin: true
  // }));
  // app.use(proxy('/videobigdata', {
  //   target: 'http://10.241.241.30/',
  //   changeOrigin: true
  // }));

  app.use(proxy('/videobigdata', {
    target: 'http://cityos-dev.jdcityos.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/videobigdata': '/videobigdata'
    }
  }));


  // app.use(proxy('/usercenter', {
  //   target: 'http://dev-platform.urban-computing.cn',
  //   changeOrigin: true
  // }));


  app.use(proxy('/api', {
    target: 'http://dright-dev.jdcityos.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }));
};
