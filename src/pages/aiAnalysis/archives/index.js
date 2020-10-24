import React from 'react';
import { Row } from 'antd';
import SearchForm from './components/index/SearchForm';
// import SmartSearch from './components/index/smartSearch';
import Imgs from './components/index/ims';
import store from './store';
import styles from './index.module.less';

function archives() {
  return (
    <div className={styles.warp}>
      <div className={styles['box-title']}>
        一人一档
      </div>
      <div className={styles['search-wrap']}>
        <Row>
          {/* <Col span={8}>
            <SmartSearch store={store} />
          </Col>
          <Col span={16}> */}
          <SearchForm store={store} />
          {/* </Col> */}
        </Row>
      </div>
      <Imgs store={store} />
    </div>
  );
}

export default archives;
