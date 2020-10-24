import React, { useCallback, useEffect } from 'react';
import {
  Modal, Form, Input, Select, message,
  Tabs
} from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ENUMS from '../../constants/enums';
import { genItems } from '@/utils/form';
import AddSingleImgs from './AddSinggleImgs';
import ExcelUpload from './ExcelUpload';
import style from './index.module.less';

const { TabPane } = Tabs;
const { Option } = Select;
const formProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const ActionModal = observer(({ store, form }) => {
  const {
    visible, editInfo, garageList
  } = store;

  const handleCancel = () => {
    store.update({ fileList: [], editInfo: {} });
    store.reset(['visible']);
  };

  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      const list = toJS(store.fileList);
      if (list.length === 0) {
        message.error('未选择车辆图片！');
        return;
      }
      const carImg = [];
      list.forEach((item, index) => {
        if (item.faceid) {
          carImg.push({
            scriptFile: item.thumbUrl,
            isMain: index === 0 ? 1 : 0,
            faceid: item.faceid
          });
        } else {
          carImg.push({ scriptFile: item.thumbUrl, isMain: index === 0 ? 1 : 0 });
        }
      });
      const params = {
        ...values,
        carImg,
        dbStatus: '1' // 入库成功
      };
      if (store.action === 'add') {
        await store.addGarage(params);
        message.success('添加成功！');
      } else {
        await store.addGarage(params);
        message.success('编辑成功！');
      }
      setTimeout(() => {
        store.queryPaging();
      }, 1000);
      handleCancel();
    });
  };
  const checkCarNumber = useCallback(async (rule, value, callback) => {
    if (!value) {
      callback('请输入车牌号码');
    } else {
      // 防止从编辑过来不修改车辆号码也校验
      if (store.editInfo.cardNumber === value) {
        callback();
        return;
      }
      await store.checkCarNumber({ cardNumber: value, cardbId: store.cardbId });
      const { isValid } = store;
      if (!isValid) {
        callback('该车辆已存在!');
      } else {
        callback();
      }
    }
  });
  const formItems = [
    {
      key: 'cardbId',
      props: {
        label: '所属车辆库'
      },
      decorator: {
        initialValue: editInfo.tableName,
        rules: [
          { required: true, message: '请选择所属车辆库' }
        ]
      },
      component: <Select placeholder="请选择布控车辆库">
        {
        garageList.map(({ cardbId, cardbName }) =>
          <Option key={cardbId} value={cardbId}>{cardbName}</Option>)
      }
      </Select>
    },
    {
      key: 'cardNumber',
      props: {
        label: '车牌号码'
      },
      decorator: {
        initialValue: editInfo.cardNumber,
        validateTrigger: 'onBlur',
        rules: [
          { validator: checkCarNumber },
          { required: true }
        ]
      },
      component: <Input placeholder="请输入车牌号码" />
    },
    {
      key: 'licensePlateColour',
      props: {
        label: '车牌颜色'
      },
      decorator: {
        initialValue: editInfo.licensePlateColour,
        rules: [
          { required: true, message: '请选择车牌颜色' }
        ]
      },
      component: <Select
        placeholder="请选择车身颜色"
        dropdownClassName={style['color-select-menu']}
      >
        {
          ENUMS.CAR_COLOR.array.map(({ key, name, color }) =>
            <Option key={key} value={key}>
              <span className={style['color-cube']} style={{ backgroundColor: color }} />
              {name}
            </Option>)
        }
      </Select>
    },
    {
      key: 'carType',
      props: {
        label: '车辆类型'
      },
      decorator: {
        initialValue: editInfo.carType,
        rules: [
          { required: true, message: '请选择车辆类型' }
        ]
      },
      component: <Select placeholder="请选择车辆类型">
        {
        ENUMS.CAR_TYPE.array.map(({ key, name }) =>
          <Option key={key} value={key}>{name}</Option>)
      }
      </Select>
    },
    {
      key: 'colour',
      props: {
        label: '车身颜色'
      },
      decorator: {
        initialValue: editInfo.colour,
        rules: [
          { required: true, message: '请选择车身颜色' }
        ]
      },
      component: <Select
        placeholder="请选择车身颜色"
        dropdownClassName={style['color-select-menu']}
      >
        {
          ENUMS.CAR_COLOR.array.map(({ key, name, color }) =>
            <Option key={key} value={key}>
              <span className={style['color-cube']} style={{ backgroundColor: color }} />
              {name}
            </Option>)
        }
      </Select>
    },
    {
      key: 'carBrand',
      props: {
        label: '车辆品牌'
      },
      decorator: {
        initialValue: editInfo.carBrand,
        rules: [
          { required: true, message: '请选择车辆品牌' }
        ]
      },
      component: <Select placeholder="请选择车辆品牌">
        {
          ENUMS.CAR_BRAND.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    }
  ];

  useEffect(() => {
    if (store.action === 'edit' && editInfo.carImg) {
      const arr = [];
      editInfo.carImg.forEach((item) => {
        arr.unshift({
          faceid: item.faceid,
          isMain: item.isMain,
          uid: item.faceid,
          name: item.faceid,
          url: `data:${item.inputStream}`,
          status: 'done',
          isOnline: true,
          thumbUrl: `data:${item.inputStream}`
        });
      });
      store.update({ fileList: arr });
    }
  }, [editInfo]);

  return (
    <Modal
      title={store.action === 'add' ? '新增车辆' : '编辑车辆'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={900}
      className={style['modal-wrap']}
      destroyOnClose
    >
      <Tabs type="card" defaultActiveKey="one" className={style['modal-tab']}>
        <TabPane key="one" tab="逐个新增">
          <div className={style['left-img-wrap']}>
            <div>车辆图片（2M之内的JPG图片）</div>
            <div className={style['add-imgs-wrap']}>
              <AddSingleImgs store={store} />
            </div>
          </div>
          <div className={style['right-form-wrap']}>
            <div className={style['car-info-title']}>车辆基本信息</div>
            <Form {...formProps}>
              {genItems(formItems, form)}
            </Form>
          </div>
        </TabPane>
        <TabPane key="tow" tab="批量导入">
          <ExcelUpload store={store} form={form} />
        </TabPane>
      </Tabs>

    </Modal>
  );
});

export default Form.create()(ActionModal);
