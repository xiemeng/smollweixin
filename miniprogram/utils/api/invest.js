const request = require('./request.js');
export const markList = (event_key, page, mark_type = 1) => request({   //投资列表接口
  version: '2_0_0',
  opact: 'mark/markList',
  platform: 3,
  event_key,
  page,
  mark_type
});
export const markInfo = (mark_id) => request( {   //投资列表详情接口
  version: '2_0_0',
  opact: 'mark/markInfo',
  platform: 3,
  mark_id
});
export const orderInterface = (type, mark_id) => request({   //充值，提现页面接口
  version: '1_0_0',
  opact: 'Order/orderInterface',
  platform: 3,
  type: type,
  mark_id: mark_id,
});
