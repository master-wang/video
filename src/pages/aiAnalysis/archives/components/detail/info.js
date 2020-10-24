import React, { useEffect, useState } from 'react';
import {
  Tag, Button, Menu, Dropdown, Input
} from 'antd';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { useRouter } from '@/hooks';
import style from './index.module.less';

export default observer(({ store }) => {
  const { query } = useRouter();
  const { personid } = query;

  const { dbInfo, sign } = store;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    store.update({ sign: dbInfo.signs });
  }, [dbInfo]);

  const onClose = async (index) => {
    const arr = sign.split(',');
    arr.splice(index, 1);
    await store.addSign({ personid, signs: arr.join(',') });
    store.getInfo({ personid });
  };

  useMount(() => {
    store.getInfo({ personid });
  });
  const stopEvents = (e) => {
    e.stopPropagation();
  };
  const onChange = (e) => {
    store.update({
      sign: e.target.value
    });
  };
  const addSign = async () => {
    await store.addSign({ personid, signs: sign });
    store.getInfo({ personid });
    setVisible(false);
  };
  const menu = (
    <Menu className={style['menu-wrap']}>
      <Menu.Item key="0">
        <div onClick={stopEvents}>
          <Input
            value={sign}
            placeholder="标签以英文逗号分隔如：犯罪嫌疑人,老人"
            style={{ width: '300px', marginRight: '10px' }}
            onChange={(e) => {
              e.persist();
              onChange(e);
            }}
          />
          <Button type="primary" onClick={addSign}>确定</Button>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={style['info-wrap']}>
      <div className={style['imp-wrap']}>
        <img src={dbInfo.faceUrl} alt="人脸" className={style['item-img']} />
        {
          !dbInfo.status ? null : <span className={style['img-degree']}>
            {`${dbInfo.similarity}`.includes('.') ? `${dbInfo.similarity}`.split('.')[1] : Number(`${dbInfo.similarity}`) * 100}
          %
          </span>
        }

      </div>
      <div className={style['modal-right']}>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>
            姓
            <span className={style['margin-en']}>名</span>
            ：
          </div>
          <div className={style['lable-right']}>{dbInfo.name || '未知'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>
            性
            <span className={style['margin-en']}>别</span>
            ：
          </div>
          <div className={style['lable-right']}>{dbInfo.male === 1 ? '男' : !dbInfo.male ? '-' : '女'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>
            年
            <span className={style['margin-en']}>龄</span>
            ：
          </div>
          <div className={style['lable-right']}>{dbInfo.age || '-'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>身份证号：</div>
          <div className={style['lable-right']}>{dbInfo.cardNumber || '-'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>
            户
            <span className={style['margin-en']}>籍</span>
            ：
          </div>
          <div className={style['lable-right']}>{dbInfo.permanentAddress || '-'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>居住地址：</div>
          <div className={style['lable-right']}>{dbInfo.currentAddress || '-'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>
            名
            <span className={style['margin-en']}>族</span>
            ：
          </div>
          <div className={style['lable-right']}>{dbInfo.nationality || '-'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>婚姻状况：</div>
          <div className={style['lable-right']}>-</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>文化程度：</div>
          <div className={style['lable-right']}>-</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>联系电话：</div>
          <div className={style['lable-right']}>{dbInfo.phoneNumber || '-'}</div>
        </div>
      </div>
      <div className={style['lable-wrap']}>
        <div id="delete-menu"></div>
        <div className={style['lable-tle']}>标签属性</div>
        {
          dbInfo.signs && dbInfo.signs.split(',').map((item, index) => <Tag
            key={index}
            closable
            onClose={() => onClose(index)}
          >
            {item}
          </Tag>)
        }
        <Dropdown overlay={menu} trigger={['click']} visible={visible}>
          <Button icon="plus" onClick={() => setVisible(true)}>添加标签</Button>
        </Dropdown>

      </div>
    </div>
  );
});
