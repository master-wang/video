/**
 * 分页参数
 */
const PAGINATION = {
  current: 1,
  total: 0,
  pageSize: 18,
  pageSizeOptions: ['6', '12', '18', '30'],
  showSizeChanger: true,
  showQuickJumper: true,
  hideOnSinglePage: true,
  showTotal: total => `共 ${total} 条`
};

export {
  PAGINATION
};
