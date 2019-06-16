const request = require('./request.js');
export const getUserCenter = (platform) => request({   //用户中心
  version: '2_0_0',
  opact: 'index/getUserCenter',
  platform: platform,
});
export const Common = () => request( {   //公共配置项值接口
  version: '1_0_0',
  opact: 'Article/Common',
});