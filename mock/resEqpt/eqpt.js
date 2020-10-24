/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/equipment', (req, res) => {
  const data = Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': {
      'list|20': [
        {
          'id|+1': 1,
          'equipmentCode': 'code-@word(8)',
          'equipmentName': 'name-@cword(6)',
          'equipmentIp': '@ip',
          'equipmentPort|0-65535': 8080,
          'organization': '@cword(50)',
          'equipmentManageName': '@cword(8)',
          'mediaDistName': '@cword(8)',
          'netStatus|1': [0, 1],
          'description': '@word(20)',
          'channelNumber|10-20': 10
        }
      ],
      'pageInfo': {
        total: 30
      }
    }
  });
  res.json(data);
});

router.get('/mock/equipment/:id', (req, res) => {
  res.json({
    code: 200,
    data: Mock.mock({
      'batch|1': [true, false],
      'accessWay': {
        'id|+1': 1,
        'type': 'access_way',
        'name': '@word(6)',
        'description': '@cword(20)'
      },
      'equipmentCode': 'code-@word(8)',
      'equipmentName': 'name-@cword(6)',
      'equipmentIp': '@ip',
      'equipmentPort|0-65535': 8080,
      'manufacturers': {
        'id|1': [1, 2, 3, 4, 5]
      },
      'location': {
        id: '0-0',
        pid: '0',
        child: [
          {
            id: '0-0-0',
            pid: '0-0'
          }
        ]
      },
      'organization': '@cword(50)',
      'description': '@word(20)'
    })
  });
});

router.get('/mock/equipment/check/:code', (req, res) => {
  res.json(Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': true
  }));
});

router.post('/mock/equipment', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

router.delete('/mock/equipment', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

module.exports = router;
