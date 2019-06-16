const request = require('./request.js');
export const homePage = (platform) => request({     //首页接口
    version: '2_0_0',
    opact: 'Index/homePage',
    platform: platform
})

export const bindBankSendSms = (type) => request({
  opact: 'userBank/bindBankSendSms',
  type: type,
})