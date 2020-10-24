/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-04-08 11:01:15
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-09 18:22:40
 */
import React, { Component } from 'react';
import {
  Table, InputNumber, Select, Button
} from 'antd';

const { Option } = Select;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { key: '1', similarity: '80', top: '1' }
      ]
    };
  }

  componentWillReceiveProps(np) {
    const { onChange, facedbInfo: oldFacedbInfo } = this.props;
    const { facedbInfo } = np;
    if (facedbInfo) {
      if (oldFacedbInfo && facedbInfo === oldFacedbInfo) {
        return;
      }
      const newArr = JSON.parse(facedbInfo).map(item => ({
        ...item,
        similarity: Number(item.similarity) * 100
      }));
      this.setState({
        data: newArr
      }, () => {
        const { data } = this.state;
        onChange(data);
      });
    }
  }

  changeInput = (e, index, type) => {
    const { data } = this.state;
    const newData = [...data];
    if (type === 'facedbName') {
      const { props: { value, children } } = e;
      newData[index][type] = children;
      newData[index].facedbId = value;
    } else {
      newData[index][type] = `${e}`;
    }
    this.setState({
      data: newData
    }, () => {
      const { onChange } = this.props;
      onChange(newData);
    });
  }

  changeItems = type => {
    const { data } = this.state;
    if (type === 'plus') {
      const newKey = `${data.length + 1}`;
      const newData = [
        ...data,
        { key: newKey, similarity: '80', top: '1' }
      ];
      this.setState({
        data: newData
      });
    } else {
      const newData = [...data];
      newData.pop();
      this.setState({
        data: newData
      });
    }
  };

  render() {
    const { data } = this.state;
    const { faceLibList } = this.props;
    const columns = [
      {
        title: '人口库名称',
        dataIndex: 'facedbId',
        key: 'facedbId',
        render: (text, all, index) => <Select
          value={text}
          placeholder="请选择人口库名称"
          onChange={(e, itemData) => this.changeInput(itemData, index, 'facedbName')}
        >
          {
            faceLibList.map((item) => <Option value={item.facedbId}>{item.facebdName}</Option>)
          }
        </Select>
      },
      {
        title: '相似度阈值',
        dataIndex: 'similarity',
        key: 'similarity',
        render: (text, all, index) => <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          value={text || 80}
          onChange={(e) => this.changeInput(e, index, 'similarity')}
        />
      },
      {
        title: '显示TopN',
        dataIndex: 'top',
        key: 'top',
        render: (text, all, index) => <InputNumber
          value={text || 1}
          onChange={(e) => this.changeInput(e, index, 'top')}
        />
      }
    ];
    return <>
      <Table columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
      <div style={{ marginTop: 10 }}>
        <Button type="primary" style={{ marginRight: 5 }} icon="plus" onClick={() => this.changeItems('plus')} />
        <Button type="primary" icon="minus" disabled={data.length <= 1} onClick={() => this.changeItems()} />
      </div>
    </>;
  }
}
