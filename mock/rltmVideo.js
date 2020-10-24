/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/location/channel/:id', (req, res) => {
  const data = Mock.mock([{
    'pid': '@natural(100)',
    'id': '@id',
    'name|': '@word(5)',
    'description': '@word(15)',
    'channelList|8': [
      {
        'channelId': '@word(6)',
        'channelName': '@word(5)',
        'channelNumber': 0,
        'channelStatus': 0,
        'videoStatus': 0,
        'startStatus': 0
      }
    ],
    'children': [{
      'pid': '@natural(100)',
      'id': '@id',
      'name': '@word(5)',
      'description': '@word(15)'
    }]
  }]);
  res.json({
    code: 200,
    data
  });
});

router.post('/mock/monitor/ptz', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

module.exports = router;
