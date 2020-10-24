/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/channel', (req, res) => {
  const data = Mock.mock({
    'code': 200,
    'msg': 'success',
    'data': {
      'list': {
        'equipmentCode': 'code-@integer(1000)',
        'equipmentName': 'eqpt-@word(8)',
        'equipmentIp': '@ip',
        'channelList|8': [
          {
            'channelId|+1': 1,
            'channelName': 'unit-@word(8)',
            'channelNumber|+1': 1,
            'channelStatus|1': [0, 1],
            'videoStatus|1': [0, 1],
            'startStatus|1': [0, 1]
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

router.get('/mock/channel/:channelId', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    data: Mock.mock({
      'channelId|+1': 1,
      'channelName': 'unit-@word(8)',
      'channelNumber|+1': 1,
      'channelStatus|1': [0, 1],
      'videoStatus|1': [0, 1],
      'startStatus|1': [0, 1],
      'description': '@cword(8)'
    })
  });
});

router.put('/mock/channel/:channelId', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

module.exports = router;
