/* eslint-disable quote-props */
const express = require('express');

const router = express.Router();

const Mock = require('mockjs');

router.get('/mock/node', (req, res) => {
  const data = Mock.mock({
    'list|8': [
      {
        'id|+1': 1,
        'nodeCode': '@word(8)',
        'nodeIp': '@ip',
        'nodeName': /node_\d{2}/,
        'netStatus|1': [0, 1],
        'description': '@cword(40)'
      }
    ],
    'pageInfo': {
      total: 8
    }
  });
  res.json({
    code: 200,
    data
  });
});

router.get('/mock/node/:nodeCode', (req, res) => {
  res.json({
    code: 200,
    data: Mock.mock({
      'nodeCode': '@word(8)',
      'nodeName': /node_\d{2}/,
      'nodeIp': '@ip',
      'description': '@cword(40)'
    })
  });
});

router.post('/mock/node', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

router.delete('/mock/node/:nodeCode', (req, res) => {
  res.json({
    code: 200,
    msg: 'success'
  });
});

module.exports = router;
