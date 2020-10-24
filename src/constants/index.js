export { default as ENUMS } from './enums';

/**
 * 常用正则
 */
export const REG_EXP = {
  // ip地址：v4
  IP_V4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  // 端口号
  PORT: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
};

/**
 * 分页参数
 */
export const PAGINATION = {
  current: 1,
  total: 0,
  pageSize: 20,
  pageSizeOptions: ['10', '20', '30', '40'],
  showSizeChanger: true,
  showQuickJumper: true,
  // hideOnSinglePage: true,
  showTotal: total => `共 ${total} 条`
};

/**
 * 路由对应的菜单状态
 * HIDE： 隐藏自身及子节点
 * HIDE_CHILDREN: 隐藏子节点
 */
export const ROUTE_MENU_STATUS = {
  HIDE: 1,
  HIDE_CHILDREN: 2
};

/**
 * 地图的主题style
 */
export const styleJson = [{
  featureType: 'water',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    color: '#151c3bff'
  }
}, {
  featureType: 'green',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    color: '#35406fff'
  }
}, {
  featureType: 'building',
  elementType: 'geometry',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'building',
  elementType: 'geometry.topfill',
  stylers: {
    color: '#333e6d00'
  }
}, {
  featureType: 'building',
  elementType: 'geometry.sidefill',
  stylers: {
    color: '#d1dbdb00'
  }
}, {
  featureType: 'building',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#aab6b600'
  }
}, {
  featureType: 'subwaystation',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    color: '#888fa000'
  }
}, {
  featureType: 'education',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    color: '#35406fff'
  }
}, {
  featureType: 'medical',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    color: '#35406fff'
  }
}, {
  featureType: 'scenicspots',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    color: '#35406fff'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    weight: '4'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'highway',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'highway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'highway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'highway',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    weight: '2'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'arterial',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'arterial',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'arterial',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'local',
  elementType: 'geometry',
  stylers: {
    visibility: 'on',
    weight: '1'
  }
}, {
  featureType: 'local',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'local',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#cacfcf00'
  }
}, {
  featureType: 'local',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'local',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#757679ff'
  }
}, {
  featureType: 'local',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    weight: '1'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#9494941a'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff1a'
  }
}, {
  featureType: 'subway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    weight: '1'
  }
}, {
  featureType: 'subway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325d33'
  }
}, {
  featureType: 'subway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff33'
  }
}, {
  featureType: 'subway',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#979c9a00'
  }
}, {
  featureType: 'subway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'continent',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'continent',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'continent',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#333333ff'
  }
}, {
  featureType: 'continent',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffffff'
  }
}, {
  featureType: 'city',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'city',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'city',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#454d50ff'
  }
}, {
  featureType: 'city',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffffff'
  }
}, {
  featureType: 'town',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'town',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'town',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#454d50ff'
  }
}, {
  featureType: 'town',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffffff'
  }
}, {
  featureType: 'road',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'districtlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'districtlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#285ddfff'
  }
}, {
  featureType: 'transportation',
  elementType: 'geometry',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'companylabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'restaurantlabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'lifeservicelabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'carservicelabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'financelabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'otherlabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'village',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'district',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'land',
  elementType: 'geometry',
  stylers: {
    color: '#1f274aff'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'provincialway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#26305b00'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'nationalway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'provincialway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'highway',
  stylers: {
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  stylers: {
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  stylers: {
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'highway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  stylers: {
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  stylers: {
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  stylers: {
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'nationalway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'provincialway',
  stylers: {
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '8-8'
  }
}, {
  featureType: 'provincialway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '8-8'
  }
}, {
  featureType: 'provincialway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '8-8'
  }
}, {
  featureType: 'cityhighway',
  stylers: {
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  stylers: {
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  stylers: {
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '6',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '7',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'labels',
  stylers: {
    visibility: 'off',
    level: '8',
    curZoomRegionId: '0',
    curZoomRegion: '6-8'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'water',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#f1eaeaff'
  }
}, {
  featureType: 'water',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#151c3b00'
  }
}, {
  featureType: 'country',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#8f5a33ff'
  }
}, {
  featureType: 'country',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffffff'
  }
}, {
  featureType: 'country',
  elementType: 'labels.text',
  stylers: {
    fontsize: '28'
  }
}, {
  featureType: 'manmade',
  elementType: 'geometry',
  stylers: {
    color: '#1f274a00'
  }
}, {
  featureType: 'provincialway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'tertiaryway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'manmade',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#99999900'
  }
}, {
  featureType: 'manmade',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'scenicspots',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'scenicspots',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'scenicspotslabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#5f5c5cff'
  }
}, {
  featureType: 'scenicspotslabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'educationlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'educationlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'medicallabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'medicallabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'companylabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'restaurantlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'hotellabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'hotellabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'shoppinglabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'shoppinglabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'lifeservicelabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'carservicelabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'transportationlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'transportationlabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'financelabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'entertainment',
  elementType: 'geometry',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'estate',
  elementType: 'geometry',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'shopping',
  elementType: 'geometry',
  stylers: {
    color: '#35406fff'
  }
}, {
  featureType: 'education',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'education',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'medical',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#999999ff'
  }
}, {
  featureType: 'medical',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'transportation',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'transportation',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#35406f00'
  }
}, {
  featureType: 'businesstowerlabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'scenicspotslabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'provincialway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'businesstowerlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'fourlevelway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'fourlevelway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'fourlevelway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'fourlevelway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'road',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'road',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#28325d00'
  }
}, {
  featureType: 'nationalway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'tertiaryway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'tertiaryway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#75767900'
  }
}, {
  featureType: 'tertiaryway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'entertainmentlabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'entertainmentlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'scenicspotsway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'universityway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}, {
  featureType: 'universityway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'vacationway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff00'
  }
}, {
  featureType: 'vacationway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#28325dff'
  }
}];
