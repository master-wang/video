/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/unit', (req, res) => {
  const data = Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': {
      'list': {
        'nodeCode': 'code-@integer(1000)',
        'nodeName': 'node-@word(8)',
        'nodeIp': '@ip',
        'serverUnits|8': [
          {
            'serverUnitId|+1': 1,
            'serverUnitName': 'unit-@word(8)',
            'serverUnitType|1': ['录像服务', '监控服务'],
            'serverUnitPort|1': [8000, 8080, 8888],
            'capacity|1': [10, 20, 30, 40, 50],
            'serverStatus|1': [0, 1],
            'updateTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
          }
        ]
      },
      'pageInfo': {
        total: 8
      }
    }
  });
  res.json(data);
});

router.get('/mock/unit/:serverUnitId', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    data: Mock.mock({
      'serverUnitId|+1': 1,
      'serverUnitName': 'unit-@word(8)',
      'serverUnitPort|1': [8000, 8080, 8888],
      'outerNet': '@ip',
      'outerPort|1': [8000, 8080, 8888],
      'capacity|50-100': 60
    })
  });
});

router.put('/mock/unit/:serverUnitId', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

module.exports = router;
