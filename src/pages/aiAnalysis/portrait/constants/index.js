// 人脸查询的配置条件
const faceQueryConfig = [
  {
    title: '查询条件',
    chrld: [
      {
        title: '抓拍时间',
        type: 'captureTime'
      },
      {
        title: '抓拍通道',
        type: 'captureWay',
        field: 'channelId'
      }
    ]
  },
  {
    title: '人像特征',
    chrld: [
      {
        title: '性别',
        type: 'sex',
        cubeArr: [
          {
            icon: 'iconmen',
            desc: '男'
          },
          {
            icon: 'iconwomen',
            desc: '女'
          }
        ]
      },
      {
        title: '年龄',
        type: 'age',
        cuboidArr: [
          {
            desc: '婴儿'
          },
          {
            desc: '幼年'
          },
          {
            desc: '少年'
          },
          {
            desc: '青年'
          },
          {
            desc: '成年'
          },
          {
            desc: '老年'
          }
        ]
      },
      {
        title: '发型',
        type: 'hair',
        cuboidArr: [
          {
            desc: '长发'
          },
          {
            desc: '短发'
          },
          {
            desc: '秃顶'
          }
        ]
      },
      {
        title: '体型',
        type: 'bodilyForm',
        cuboidArr: [
          {
            desc: '标准'
          },
          {
            desc: '胖'
          },
          {
            desc: '瘦'
          }
        ]
      },
      {
        title: '颜色',
        type: 'color',
        colorSelectArr: [
          {
            desc: '上衣'
          },
          {
            desc: '下衣'
          }
        ],
        fieldArr: ['jacketColor', 'bottomColor']
      },
      {
        title: '配饰',
        type: 'accessory',
        cubeArr: [
          {
            icon: 'iconglasses',
            desc: '眼镜',
            field: 'accessory'
          },
          {
            icon: 'iconcap',
            desc: '帽子',
            field: 'accessory'
          },
          {
            icon: 'iconmask',
            desc: '口罩',
            field: 'accessory'
          }
        ]
      }
    ]
  }
];

// 配置的上衣下衣颜色
const colors = [
  {
    desc: '白色',
    color: '#EBEFFF'
  },
  {
    desc: '黑色',
    color: '#000000'
  },
  {
    desc: '灰色',
    color: '#808080'
  },
  {
    desc: '棕色',
    color: '#804E22'
  },
  {
    desc: '红色',
    color: '#E94A4A'
  },
  {
    desc: '橙色',
    color: '#FF870F'
  },
  {
    desc: '黄色',
    color: '#FFFF24'
  },
  {
    desc: '绿色',
    color: '#26FF4A'
  },
  {
    desc: '蓝色',
    color: '#0080FF'
  },
  {
    desc: '紫色',
    color: '#8620ED'
  },
  {
    desc: '样红色',
    color: '#F129F1'
  },
  {
    desc: '粉色',
    color: '#FB6EBF'
  }
];

const eventQueryConfig = [
  {
    title: '查询条件',
    chrld: [
      {
        title: '抓拍时间',
        type: 'captureTime'
      },
      {
        title: '抓拍通道',
        type: 'captureWay'
      },
      {
        title: '事件类型',
        type: 'eventType'
      }
    ]
  }
];

/**
 * 分页参数
 */
const PAGINATION = {
  current: 1,
  total: 0,
  pageSize: 24,
  pageSizeOptions: ['8', '16', '24', '40'],
  showSizeChanger: true,
  showQuickJumper: true,
  hideOnSinglePage: true,
  showTotal: total => `共 ${total} 条`
};

export {
  faceQueryConfig, colors, eventQueryConfig,
  PAGINATION
};
