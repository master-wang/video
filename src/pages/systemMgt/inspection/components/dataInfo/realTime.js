/* eslint-disable no-unused-vars */
import React from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import {
  Row, Col, Card, List,
  Table, Badge, Descriptions,
  Divider, Progress
} from 'antd';
import TreeInfo from './treeInfo';
import styles from './index.module.less';

const cpuPng = require('@/images/cpu.png');
const videoPng = require('@/images/video.png');


export default observer(({ store }) => {
  const { device, DeviceInfo, Units } = store;

  const getOption = ({
    color, beginColor, endColor, name, times = ['00:00', '01:00', '02:00'], vals = [0, 0, 0]
  }) => {
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26,35,71,1)',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(9,16,46,1);',
        formatter(params, ticket, callback) {
          return `<div style="width: 160px;
          height: 50px;
          background: rgba(26,35,71,1);
          border-radius: 2px;

          padding:8px 12px;
          ">
          <div>${params[0].axisValue}</div>
          <div><span
          style="
          color: rgba(235,239,255,0.67);
          fontSize: 12px;
          ">
            ${params[0].marker}
            ${name}:${params[0].data}%</span></div>
          </div>`;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times,
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          },
          formatter(value) {
            return `${value}%`;
          }
        },
        splitLine: {
          show: false
        },
        minPadding: 0,
        startOnTick: false
      },
      series: [{
        data: vals,
        type: 'line',
        symbol: 'none',
        itemStyle: {
          color
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: beginColor
          }, {
            offset: 1,
            color: endColor
          }])
        }
      }]
    };
    return option;
  };


  // eslint-disable-next-line max-len
  const drawDoubleLine = (titleName, xData = ['00:00', '01:00', '02:00'], seriesNameOne, seriesDataOne = [0, 0, 0], seriesNameTwo, seriesDataTwo) => {
    const doubleLineOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26,35,71,1)',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(9,16,46,1);',
        formatter(params, ticket, callback) {
          return `<div style="width: 160px;
          height: 50px;
          background: rgba(26,35,71,1);
          border-radius: 2px;

          padding:8px 12px;
          ">
          <div>${params[0].axisValue}</div>
          <div><span
          style="
          color: rgba(235,239,255,0.67);
          fontSize: 12px;
          ">
          ${params[0].marker}
            ${seriesNameOne}:${params[0].data}%</span></div>
          </div>`;
        }
      },
      /**
       * 第二个值
       * <div><span
          style="
          color: rgba(235,239,255,0.67);
          fontSize: 12px;
          ">
            <img src=${videoPng} >
            ${seriesNameTwo}:${params[1].data}%</span></div>
       */
      xAxis: [{
        type: 'category',
        // x轴坐标点开始与结束点位置都不在最边缘
        boundaryGap: false,
        axisLine: {
          show: true,
          // x轴线样式
          lineStyle: {
            color: '#17273B',
            width: 1,
            type: 'solid'
          }
        },
        // x轴字体设置
        axisLabel: {
          show: true,
          fontSize: 12,
          color: 'white'
        },
        data: xData
      }],
      yAxis: [{
        type: 'value',
        // y轴字体设置
        axisLabel: {
          show: true,
          color: 'white',
          fontSize: 12,
          formatter(value) {
            return `${value}%`;
          }
        },
        // y轴线设置显示
        axisLine: {
          show: true
        },
        // 与x轴平行的线样式
        splitLine: {
          show: true,
          lineStyle: {
            color: '#17273B',
            width: 1,
            type: 'solid'
          }
        },
        minPadding: 0,
        startOnTick: false
        // data: [20]
      }],
      series: [{
        name: seriesNameOne,
        type: 'line',
        // smooth: true,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgb(57,114,222, 0.8)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgb(57,114,222, 0)' // 100% 处的颜色
            }],
            globalCoord: false
          },
          width: 2,
          type: 'solid'
        },
        // 折线连接点样式
        itemStyle: {
          color: '#3E7EF5'
        },
        // 折线堆积区域样式
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(57,114,222, 0.4)'
          }, {
            offset: 1,
            color: 'rgb(57,114,222, 0)'
          }])
        },
        data: seriesDataOne
      }, {
        name: seriesNameTwo,
        type: 'line',
        // smooth: true,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#B3950C' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#B3950C' // 100% 处的颜色
            }],
            globalCoord: false
          },
          width: 2,
          type: 'solid'
        },
        // 折线连接点样式
        itemStyle: {
          color: '#B3950C'
        },
        // 折线堆积区域样式
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(159,134,20,0.4)'
          }, {
            offset: 1,
            color: 'rgb(159,134,20,0)'
          }])
        },
        data: seriesDataTwo
      }]
    };
    return doubleLineOption;
  };


  const getPie = ({ value = 0, color = '#4083FF', subtext }) => {
    const option = {
      title: {
        text: `${value || 0}%`,
        textStyle: {
          color: '#fff',
          fontSize: 20
        },
        subtext: subtext || '',
        subtextStyle: {
          color: 'rgb(235, 239, 255)',
          fontSize: 14
        },
        itemGap: 70, // 主副标题距离
        left: 'center',
        top: 'center'
      },
      angleAxis: {
        max: 100, // 满分
        clockwise: true, // 逆时针
        // 隐藏刻度线
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      radiusAxis: {
        type: 'category',
        // 隐藏刻度线
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      polar: {
        center: ['50%', '50%'],
        radius: '130%' // 图形大小
      },
      series: [{
        type: 'bar',
        data: [{
          name: '已使用',
          value,
          itemStyle: {
            normal: {
              color
              // color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              //   offset: 0,
              //   color
              // }, {
              //   offset: 1,
              //   color
              // }])
            }
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 10,
        barGap: '-100%', // 两环重叠
        z: 2
      }, { // 灰色环
        type: 'bar',
        data: [{
          value: 100,
          itemStyle: {
            color: '#272D4C'
            // shadowColor: 'rgba(0, 0, 0, 0.2)'
            // shadowBlur: 5,
            // shadowOffsetY: 2
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 10,
        barGap: '-100%', // 两环重叠
        z: 1
      }]
    };
    return option;
  };

  const columns = [
    {
      title: '服务单元名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '服务单元类型',
      dataIndex: 'unitType',
      key: 'unitType'
      // render: (type) => {
      //   Units.slice().forEach((item) => {
      //     if (item.type === type) {
      //       return item.name;
      //     }
      //   });
      // }
    },
    {
      title: '服务单元端口',
      dataIndex: 'unitPort',
      key: 'unitPort'
    },
    {
      title: '网络状态',
      dataIndex: 'serverStatus',
      key: 'serverStatus',
      render: (serverStatus) => (serverStatus ? <Badge status="success" text="在线" />
        : <Badge status="default" text="离线" />)
    }
  ];

  const getC = (num = 0) => {
    const arr = new Array(16).toString().split(',').map((item, index) => index);
    return arr.map((item, index) => {
      if (index <= num) {
        return <Badge key={index} status="warning" />;
      }
      return <Badge key={index} status="default" />;
    });
  };

  const { cpugraph = {}, memgraph = {}, netgraph = {} } = DeviceInfo;
  const cpuTime = Object.keys(cpugraph).sort();
  const cpuVals = [];
  cpuTime.forEach((key) => {
    cpuVals.push(cpugraph[key]);
  });
  const memTimes = Object.keys(memgraph).sort();
  const memVals = [];
  memTimes.forEach((key) => {
    memVals.push(memgraph[key]);
  });
  const netTimes = Object.keys(netgraph).sort();
  const netVals = [];
  netTimes.forEach((key) => {
    netVals.push(netgraph[key]);
  });

  const time = new Date();
  const timestamp = Date.parse(time);

  return (
    <div className={styles['realTime-wrap']}>
      <Row>
        <Col span={4}>
          <TreeInfo store={store} />
        </Col>
        {
        store.device ? <Col span={20} className={styles['server-data']}>
          <Row style={{ height: '392px' }} gutter={[24, 24]}>
            <Col lg={{ span: 12 }}>
              <Card title="基本信息">
                <Descriptions column={2}>
                  <Descriptions.Item label="设备名称">{DeviceInfo.deviceName}</Descriptions.Item>
                  <Descriptions.Item label="设备IP">{DeviceInfo.deviceip}</Descriptions.Item>
                  <Descriptions.Item label="运行时间">
                    {DeviceInfo.nowTime
                      ? ((timestamp - DeviceInfo.upTime) / (24 * 60 * 60 * 1000)).toFixed(2) : 0}
                    天
                  </Descriptions.Item>
                  <Descriptions.Item label="核心处理器">
                    {DeviceInfo.cpuNum}
                    个
                  </Descriptions.Item>
                  <Descriptions.Item label="操作系统">{DeviceInfo.osVersion}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Row>
                  <Col span={8} className={styles['server-pie']}>
                    <ReactEcharts
                      option={getPie({ value: DeviceInfo.cpuUsage ? DeviceInfo.cpuUsage.toFixed(2) : null, color: '#4083FF', subtext: 'CPU使用率' })}
                      style={{ flex: 1, maxWidth: '190px', minWidth: '190px' }}
                    />
                    {/* <span className={styles['pie-title']}>CPU使用率</span> */}

                  </Col>
                  <Col span={8} className={styles['server-pie']}>
                    <ReactEcharts
                      option={getPie({ value: DeviceInfo.memUsage ? DeviceInfo.memUsage.toFixed(2) : null, color: '#B4F572', subtext: '内存使用率' })}
                      style={{ flex: 1, maxWidth: '190px', minWidth: '190px' }}
                    />
                    {/* <span className={styles['pie-title']}>内存使用率</span> */}

                  </Col>
                  <Col span={8} className={styles['server-pie']}>
                    <ReactEcharts
                      option={getPie({ value: DeviceInfo.netUsage ? DeviceInfo.netUsage.toFixed(2) : null, color: '#01B37B', subtext: '网卡使用率' })}
                      style={{ flex: 1, maxWidth: '190px', minWidth: '190px' }}
                    />
                    {/* <span className={styles['pie-title']}>网卡使用率</span> */}

                  </Col>
                </Row>
              </Card>

            </Col>
            <Col lg={{ span: 12 }}>
              <Row gutter={[24, 24]}>
                <Col lg={{ span: 12 }}>
                  <Card
                    title="硬盘容量："
                    extra={<div className={styles['extra-desc']}>
                      {DeviceInfo.diskSize ? DeviceInfo.diskSize.toFixed(2) : 0}
                      MB
                    </div>}
                  >
                    <Descriptions column={2}>
                      <Descriptions.Item label="可用">
                        {(DeviceInfo.diskSize - DeviceInfo.diskSize * (DeviceInfo.diskUsage / 100))
                          .toFixed(2)}
                        MB
                      </Descriptions.Item>
                    </Descriptions>
                    <Progress percent={DeviceInfo.diskUsage} showInfo={false} status="active" />
                  </Card>
                </Col>
                <Col lg={{ span: 12 }}>
                  <Card
                    title="内存："
                    extra={<div className={styles['extra-desc']}>
                      {device.memSize ? device.memSize.toFixed(2) : 0}
                      MB
                    </div>}
                  >
                    <Descriptions column={2}>
                      <Descriptions.Item label="可用">
                        {(DeviceInfo.memSize - DeviceInfo.memSize * (DeviceInfo.memUsage / 100))
                          .toFixed(2)}
                        MB
                      </Descriptions.Item>
                    </Descriptions>
                    <div className={styles['brange-catch-wrap']}>
                      {getC(Math.ceil((DeviceInfo.memUsage / 100) * 16))}
                    </div>

                  </Card>
                </Col>
              </Row>
              <Row style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <Card title="服务单元运行状态">
                    <Table
                      dataSource={DeviceInfo.unitNodeList}
                      pagination={false}
                      columns={columns}
                      scroll={{ y: 125 }}
                      rowKey="id"
                    />
                  </Card>
                </Col>
              </Row>

            </Col>
          </Row>
          {
            DeviceInfo.monitorStatus ? <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card title="CPU使用率趋势">
                  <div style={{ marginBottom: '20px' }}>
                    <div className={styles['brage-wrap']}>
                      {/* <div className={styles['cpu-title-wrap']}>
                        <span className={styles['cpu-tip']}></span>
                      CPU
                      </div> */}
                      <div className={styles['video-title-wrap']}>
                        {/* <span className={styles['video-tip']}></span>
                      录像服务 */}
                        <span className={styles['cpu-tip']}></span>
                        CPU
                      </div>
                    </div>
                    <ReactEcharts
                      option={drawDoubleLine('', cpuTime, 'CPU', cpuVals, '', [])}
                      style={{ marginLeft: '-50px', width: '115%' }}
                    />
                  </div>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="内存使用率趋势">
                  <div>
                    <div className={styles['brage-wrap']}>
                      <div className={styles['video-title-wrap']}>
                        <span className={styles['catch-tip']}></span>
                      内存
                      </div>
                    </div>
                    <ReactEcharts
                      option={getOption({
                        color: '#B2F372', beginColor: 'rgb(173,236,112,0.4)', endColor: 'rgb(173,236,112,0)', name: '内存', times: memTimes, vals: memVals
                      })}
                      style={{ marginLeft: '-50px', width: '115%' }}
                    />
                  </div>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="网卡使用率趋势">
                  <div>
                    <div className={styles['brage-wrap']}>
                      <div className={styles['video-title-wrap']}>
                        <span className={styles['net-tip']}></span>
                      网卡
                      </div>
                    </div>
                    <ReactEcharts
                      option={getOption({
                        color: '#01B37B', beginColor: 'rgb(2,172,121,0.4)', endColor: 'rgb(2,172,121,0)', name: '网卡', times: netTimes, vals: netVals
                      })}
                      style={{ marginLeft: '-50px', width: '115%' }}
                    />
                  </div>
                </Card>
              </Col>
            </Row> : null
          }
        </Col>
          : <Col span={20} className={styles['server-data']}>
            <List dataSource={[]} />
          </Col>
      }
      </Row>
    </div>
  );
});
