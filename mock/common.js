/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

const enums = {
  access_way: Mock.mock({
    'data|5': [
      {
        'id|+1': 1,
        'type': 'access_way',
        'name': function () {
          return `接入方式-${this.id}`;
        }
      }
    ]
  }).data,
  camera_type: Mock.mock({
    'data|5': [
      {
        'id|+1': 1,
        'type': 'camera_type',
        'name': function () {
          return `摄像头类型-${this.id}`;
        }
      }
    ]
  }).data,
  manufacturers: Mock.mock({
    'data|5': [
      {
        'id|+1': 1,
        'type': 'manufacturers',
        'name': function () {
          return `厂家-${this.id}`;
        }
      }
    ]
  }).data
};

router.post('/mock/common/enum/', (req, res) => {
  const types = req.body.type;
  const data = [];
  types.forEach(item => {
    data.push({
      type: item,
      list: enums[item] || []
    });
  });
  res.json({
    code: 200,
    msg: 'success',
    data
  });
});

router.get('/mock/common/units', (req, res) => {
  const data = Mock.mock({
    'code': 200,
    'msg': 'success',
    'data|5': [
      {
        'id|+1': 1,
        'type|+1': 1,
        'code': '@word(8)',
        'name|+1': ['设备管理服务', '录像服务', '流媒体管理服务', '回放服务', '国际设备管理服务'],
        'description': '@cword(20)'
      }
    ]
  });
  res.json(data);
});

module.exports = router;
