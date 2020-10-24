/* eslint-disable no-unused-vars */
/**
 * path {string}: 匹配路径
 * name {string}: 菜单名称
 * icon {string}: 对应图标，请使用svg图片
 * index {boolean}: true表示当前为默认跳转路由，默认为false
 * exact {boolean}: 是否执行精确匹配，默认true
 * layout {boolean}: 对应组件是否是布局组件
 * status {number}: 路由对应菜单的状态(显示or隐藏)，对应CST.ROUTE_MENU_STATUS
 * isDropMenu {boolean}: 判断路由是否为下拉菜单，默认为false
 * component {React.Component}: 对应组件
 */
const STATUS = CST.ROUTE_MENU_STATUS;

export default [
  {
    path: '/user',
    exact: false,
    layout: true,
    component: () => import('@/layouts/UserLayout'),
    routes: [
      {
        path: '/user/login',
        name: '登陆',
        component: () => import('@/pages/login')
      }
    ]
  },
  {
    path: '/',
    exact: false,
    layout: true,
    component: () => import('@/layouts/BasicLayout'),
    routes: [
      // {
      //   path: '/rltmVideo',
      //   icon: 'rltm_video',
      //   name: '实时监控',
      //   component: () => import('@/pages/rltmVideo')
      // },
      {
        path: '/videoApplications/rltmVideo',
        icon: 'rltm_video',
        name: '视频应用',
        isDropMenu: true,
        component: () => import('@/pages/videoApplications/rltmVideo'),
        routes: [
          {
            path: '/videoApplications/rltmVideo',
            name: '实时监控',
            component: () => import('@/pages/videoApplications/rltmVideo')
          }
        ]
      },
      // {
      //   path: '/resEqpt',
      //   name: '资源和设备管理',
      //   icon: 'res_eqpt',
      //   status: STATUS.HIDE_CHILDREN,
      //   component: () => import('@/pages/resEqpt'),
      //   routes: [
      //     {
      //       path: '/resEqpt/unit',
      //       name: '服务单元管理',
      //       component: () => import('@/pages/resEqpt/unit')
      //     },
      //     {
      //       path: '/resEqpt/channel',
      //       name: '视频设备通道管理',
      //       component: () => import('@/pages/resEqpt/channel')
      //     }
      //   ]
      // },
      // {
      //   path: '/locInfo',
      //   icon: 'loc_info',
      //   name: '位置信息库',
      //   component: () => import('@/pages/locInfo')
      // },
      {
        path: '/aiAnalysis',
        icon: 'aiAnalysis',
        name: '智能分析',
        isDropMenu: true,
        component: () => import('@/pages/aiAnalysis/carRecognition'),
        routes: [
          {
            path: '/aiAnalysis/portrait',
            name: '人像分析',
            component: () => import('@/pages/aiAnalysis/portrait')
          },
          {
            path: '/aiAnalysis/carRecognition',
            name: '车辆识别',
            component: () => import('@/pages/aiAnalysis/carRecognition')
          },
          {
            path: '/aiAnalysis/eventAlarm',
            name: '布控事件告警',
            component: () => import('@/pages/aiAnalysis/eventAlarm')
          },
          {
            path: '/aiAnalysis/archives',
            name: '一人一档',
            component: () => import('@/pages/aiAnalysis/archives'),
            routes: [
              {
                path: '/aiAnalysis/archives/detail',
                name: '详情',
                component: () => import('@/pages/aiAnalysis/archives/detail')
              }
            ]
          }
        ]
      },
      // 使用菜单格式的路由
      {
        path: '/aiconfigs',
        icon: 'res_eqpt',
        name: '智能配置',
        isDropMenu: true,
        component: () => import('@/pages/aiConfigs/cars'),
        routes: [
          {
            path: '/aiConfig',
            name: '人口库管理',
            component: () => import('@/pages/aiConfigs/AIConfig'),
            routes: [
              {
                path: '/aiConfig/portrait/:id',
                name: '人口库',
                component: () => import('@/pages/aiConfigs/AIConfig/portrait')
              }
            ]
          },
          {
            path: '/aiconfigs/cars',
            name: '车辆库管理',
            component: () => import('@/pages/aiConfigs/cars'),
            routes: [
              {
                path: '/aiconfigs/cars/carsMgmt',
                name: '车辆管理',
                component: () => import('@/pages/aiConfigs/cars/components/carsMgmt')
              }
            ]
          },
          {
            path: '/aiconfigs/eventControl',
            name: '事件布控',
            component: () => import('@/pages/aiConfigs/eventControl')
          },
          {
            path: '/aiconfigs/operate',
            name: '智能巡检配置',
            component: () => import('@/pages/aiConfigs/operate')
          }
        ]
      },
      {
        path: '/systemMgt',
        icon: 'systemMgt',
        name: '系统管理',
        isDropMenu: true,
        component: () => import('@/pages/systemMgt/equipment/resEqpt'),
        routes: [
          {
            path: '/systemMgt/resEqpt',
            name: '资源设备管理',
            component: () => import('@/pages/systemMgt/equipment/resEqpt'),
            routes: [
              {
                path: '/systemMgt/resEqpt/unit',
                name: '服务单元管理',
                component: () => import('@/pages/systemMgt/equipment/resEqpt/unit')
              },
              {
                path: '/systemMgt/resEqpt/channel',
                name: '视频设备通道管理',
                component: () => import('@/pages/systemMgt/equipment/resEqpt/channel')
              }
            ]
          },
          {
            path: '/systemMgt/maintain',
            name: '系统管理',
            component: () => import('@/pages/systemMgt/maintain')
          },
          {
            path: '/systemMgt/private',
            name: '权限管理',
            component: () => import('@/pages/systemMgt/private')
          },
          {
            path: '/systemMgt/inspection',
            name: '智能巡检',
            component: () => import('@/pages/systemMgt/inspection')
          }
        ]
      }
    ]
  }
];
