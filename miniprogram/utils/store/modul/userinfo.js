const actions = require('../action/userinfo.js');

const initState = {
  userInfo: {
    nickName: '刘能',
    avatarUrl: ''
  },
  hasUserInfo: false
}

module.exports = function (state = initState, action = {}) {
  switch (action.type) {
    case actions.USERINFO_UPDATE:
      const newState = { ...state, ...action.data };
      return newState;
    default:
      return state;
  }
}