/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/location/tree/:id', (req, res) => {
  const { id } = req.params;
  const data = Mock.mock({
    'code': 200,
    'msg': 'success',
    'data|8': [
      {
        'pid': id,
        'id': function (arg) {
          return `${id}-${arg.context.path[2]}`;
        },
        'name': '@cword(6)',
        'hasChild|1': [true, false]
      }
    ]
  });
  res.json(data);
});

router.get('/mock/location/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    'code': 200,
    'msg': 'success',
    'data': {
      'id': id,
      'code': `code-${id}`,
      'name': '组织名称',
      'pName': '上级组织名称',
      'description': '描述信息测试'
    }
  });
});

router.delete('/mock/location/:id', (req, res) => {
  res.json({
    'code': 200,
    'msg': 'success'
  });
});

router.post('/mock/location', (req, res) => {
  res.json({
    'code': 200,
    'msg': 'success',
    'data': 123456789
  });
});

router.get('/mock/location/check/:code', (req, res) => {
  res.json(Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': true
  }));
});

router.get('/mock/location/searching', (req, res) => {
  res.json(Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': []
  }));
});

module.exports = router;
