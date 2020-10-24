import React, {
  useState, useCallback, useRef, useEffect
} from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Modal, Radio, Icon, Tooltip,
  Button
} from 'antd';
import VideoCon from './videoCon';
import style from './index.module.less';

const { Group, Button: RaButton } = Radio;
const deawConfig = {
  fill: '#4083FF',
  strokeWidth: '4',
  stroke: '#ECC500',
  opacity: '0.3'
};

const maxWidth = '812';
const maxHeight = '457';
// 当前展示视频的比例和1920*1080的像素换算比例
const conversionUnit = 2.364;


export default observer(({ store }) => {
  const { ereaVisible, regions, channelName } = store;

  const svgRef = useRef();
  // 全选、框选等的要渲染的图形list
  const [data, setData] = useState([]);
  // 点击图像的时候，保留其id
  const [clickDomId, setClickDomId] = useState(null);
  // 画图的统一代理工具
  const [drawUtil, setDrawUtil] = useState(null);
  // 单选框的类型
  const [radioType, setRadioType] = useState('');

  const handleCancel = () => {
    store.update({ ereaVisible: false, regions: [] });
  };
  const handleOk = () => {
    // 画图得到的数据
    const [{
      props: {
        x, y, width, height
      }
    }] = data;
    const val = [
      { x, y },
      {
        x: ((x + width) * conversionUnit).toFixed(3),
        y: ((y + height) * conversionUnit).toFixed(3)
      }
    ];
    store.updateControlArea({ id: store.id, field: ['regions'], val: [val] });
    handleCancel();
  };

  // 全选、框选等的改变的时候
  const onChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case 'all':
        setData([{
          id: 1,
          props: {
            key: 1,
            dataid: 1,
            x: '0',
            y: '0',
            width: maxWidth,
            height: maxHeight,
            style: deawConfig
          },
          component: 'rect'
        }]);
        break;
      case 'rect':
        break;
      case 'circle':
        break;
      case 'polygon':
        break;
      default:
    }
    setRadioType(value);
  };
  // 清除的函数
  const handelClear = useCallback(() => {
    setData([]);
    setData('');
  }, [store]);
  // 退格键的删除,删除
  const keydown = (e) => {
    const event = e || window.event;
    if (event.keyCode === 8 && clickDomId) {
      const arr = [];
      data.forEach((item) => {
        if (item.id !== clickDomId) {
          const obj = _.cloneDeep(item);
          arr.push(obj);
        }
      });
      setData(arr);
      setClickDomId(null);
    }
  };
  // 筛选选中的哪个图像的颜色
  const selectClickDom = (id) => {
    const arr = [];
    data.forEach((item) => {
      if (`${item.id}` === `${id}`) {
        const obj = _.cloneDeep(item);
        obj.props.style.stroke = '#F14D40';
        arr.push(obj);
      } else {
        const obj = _.cloneDeep(item);
        obj.props.style.stroke = '#ECC500';
        arr.push(obj);
      }
    });
    setData(arr);
    setClickDomId(Number(id));
  };
  // 鼠标移动画图的时候
  const drawMove = (e) => {
    const event = e || window.event;
    // 拦截冒泡获取点击的图形
    if (event.target.tagName !== 'image') {
      const id = event.target.attributes.dataid.value;
      selectClickDom(id);
      return;
    }
    const nowX = event.offsetX;
    const nowY = event.offsetY;
    // 由于setDrawUtil在页面之后才能获取到值，故需要一个闭包变量来获取对应的一个画图工具参数
    const utilObj = {
      util: null
    };
    // 画多边形的线
    const polygonObj = {
      points: [`${nowX} ${nowY}`]
    };
    svgRef.current.onmousemove = (ev) => {
      if (!radioType || radioType === 'all') {
        return;
      }
      const moveW = ev.offsetX - nowX < 0 ? -(ev.offsetX - nowX) : ev.offsetX - nowX;
      const moveH = ev.offsetY - nowY < 0 ? -(ev.offsetY - nowY) : ev.offsetY - nowY;
      // 获取数据递增的id
      const id = data.length ? Number(data[data.length - 1].id) + 1 : 1;
      switch (radioType) {
        case 'rect':
          utilObj.util = {
            id,
            props: {
              key: id,
              dataid: id,
              x: nowX,
              y: nowY,
              width: moveW,
              height: moveH,
              style: deawConfig
              // onKeyDown: keydown
            },
            component: 'rect'
          };
          setDrawUtil(<rect {...utilObj.util.props} />);
          break;
        case 'circle':
          utilObj.util = {
            id,
            props: {
              key: id,
              dataid: id,
              cx: nowX,
              cy: nowY,
              r: moveW,
              style: deawConfig
              // onKeyDown: keydown
            },
            component: 'circle'
          };
          setDrawUtil(<circle {...utilObj.util.props} />);
          break;
        case 'polygon':
          polygonObj.points.push(`${ev.offsetX} ${ev.offsetY}`);
          utilObj.util = {
            id,
            props: {
              key: id,
              dataid: id,
              points: polygonObj.points.join(','),
              style: deawConfig
              // onKeyDown: keydown
            },
            component: 'polygon'
          };
          setDrawUtil(<polygon {...utilObj.util.props} />);
          break;
        default:
      }
    };
    svgRef.current.onmouseup = (upEvent) => {
      const isUp = upEvent.offsetX === nowX && upEvent.offsetY === nowY;
      if (!radioType || radioType === 'all' || !utilObj.util || isUp) {
        return;
      }
      svgRef.current.onmousemove = null;
      svgRef.current.onmousedown = null;
      // 鼠标放开，则将该工具类放到数据里去（画所有图形）
      // setData([...data, utilObj.util]);
      // 暂时只画一个矩形
      setData([utilObj.util]);
      // 清空画图工具
      setDrawUtil(null);
      utilObj.util = null;
    };
  };

  // 数据渲染图形
  const renderFun = ({ component, props }) => {
    switch (component) {
      case 'rect':
        return <rect {...props} />;
      case 'circle':
        return <circle {...props} />;
      case 'polygon':
        return <polygon {...props} />;
      default:
    }
  };

  // 挂载画图
  useEffect(() => {
    if (regions.length) {
      const [{ x: startX, y: startY }, { x: endX, y: endY }] = regions;
      const width = ((endX - startX) / conversionUnit).toFixed(3);
      const height = ((endY - startY) / conversionUnit).toFixed(3);
      setData([{
        id: 1,
        props: {
          key: 1,
          dataid: 1,
          x: startX,
          y: startY,
          width,
          height,
          style: deawConfig
        },
        component: 'rect'
      }]);
      return;
    }
    setData([]);
  }, [regions]);

  return (
    <Modal
      title={`设置区域边界（ ${channelName} ）`}
      visible={ereaVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={860}
      destroyOnClose
      className={style['erea-wrap']}
    >
      <div className={style['control-wrap']}>
        <div>
          <Group onChange={onChange} defaultValue={radioType}>
            <Tooltip placement="topLeft" title="全选">
              <RaButton value="all">
                <span className="iconfont iconall-select"></span>
              </RaButton>
            </Tooltip>
            <Tooltip placement="topLeft" title="框选">
              <RaButton value="rect">
                <span className="iconfont iconrec-select"></span>
              </RaButton>
            </Tooltip>
            {/* <Tooltip placement="topLeft" title="圈选">
              <RaButton value="circle">
                <span className="iconfont iconcircle-select"></span>
              </RaButton>
            </Tooltip>
            <Tooltip placement="topLeft" title="直线区域">
              <RaButton value="polygon">
                <span className="iconfont iconduobianxing-select"></span>
              </RaButton>
            </Tooltip> */}
          </Group>
          <Button className={style['clear-btn']} onClick={handelClear}>
            <Icon type="delete" />
            清除
          </Button>
        </div>
        <div className={style['img-wrap']}>
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            onMouseDown={() => drawMove()}
            tabIndex={0}
            onKeyUp={() => keydown()}
            className={radioType ? style['svg-cursor'] : style['svg-wrap']}
          >
            <image
              x="0"
              y="0"
              width={maxWidth}
              height={maxHeight}
            />
            {/* 渲染的所有已经画好的图型 暂时隐藏其他的画图 */}
            {
              data.length && data.map((item) => renderFun(item))
            }
            {/* 代理画图的工具 */}
            {drawUtil}
          </svg>
        </div>
        <VideoCon />
      </div>
    </Modal>
  );
});
