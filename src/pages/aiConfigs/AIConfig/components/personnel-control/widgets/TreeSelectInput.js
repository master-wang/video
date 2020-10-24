/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-04-08 11:01:44
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 16:02:28
 */
import React, { Component } from 'react';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const generateTree = (array, parentID, smoothingArr = []) => {
  if (Array.isArray(array) && array.length) {
    const newArr = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const {
        id, channelId, name, channelName, child, channelList
      } = element;
      const PID = parentID ? `${parentID}-${id || channelId}` : `${id}`;
      const childNodes = [
        ...(child && Array.isArray(child) ? child : []),
        ...(channelList && Array.isArray(channelList) ? channelList : [])
      ];
      newArr.push({
        ...element,
        title: name || channelName,
        value: PID,
        key: PID,
        children: generateTree(childNodes, PID, smoothingArr).newArr
      });
      if (channelName || channelId) {
        smoothingArr.push({
          ...element,
          title: name || channelName,
          value: PID,
          key: PID,
          children: generateTree(childNodes, PID).newArr
        });
      }
    }
    return { newArr, smoothingArr };
  }
  return [];
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyList: [],
      treeData: generateTree(props.treeData).newArr,
      smoothingTreeData: generateTree(props.treeData).smoothingArr
    };
  }

  componentWillReceiveProps(np) {
    const { onChange, keyList: oldKeyList } = this.props;
    const { keyList } = np;
    if (keyList) {
      if (oldKeyList && keyList === oldKeyList.toString()) {
        return;
      }
      this.setState({
        keyList: keyList.split(',')
      }, () => {
        const { keyList: keys } = this.state;
        onChange(this.renderData(keys));
      });
    }
  }

  renderData = keyList => {
    const { smoothingTreeData } = this.state;
    this.setState({ keyList });
    const arr = [];
    if (
      keyList
      && Array.isArray(keyList)
      && smoothingTreeData
      && Array.isArray(smoothingTreeData)
    ) {
      for (let i = 0; i < keyList.length; i++) {
        const element = keyList[i];
        const elementLen = element.length;
        for (let j = 0; j < smoothingTreeData.length; j++) {
          const treeItem = smoothingTreeData[j];
          if (element === treeItem.key.slice(0, elementLen)) {
            arr.push(treeItem);
          }
        }
      }
    }
    return { keyList, arr };
  }

  render() {
    const { onChange, disabled } = this.props;
    const { keyList: value, treeData } = this.state;
    const tProps = {
      disabled,
      treeData,
      value,
      onChange: (keyList) => onChange(this.renderData(keyList)),
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请选择视频源通道',
      style: { width: '100%' }
    };
    return <TreeSelect {...tProps} />;
  }
}
