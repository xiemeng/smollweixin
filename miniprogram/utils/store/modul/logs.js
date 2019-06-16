import { addLogs, actions } from "../action/logs.js"
const initState = {//初始化数据
  logs: []
}

module.exports = function (state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case actions.LOGS_ADD://增加
      newState.logs.push({
        val: action.data.val,
        goosCode: action.data.goosCode
      });
      return newState;
    case actions.LOGS_CLEAR://清空
      newState.logs = [];
      return newState;
    case actions.LOGS_CHANGE://改变数组
      newState.logs.map((res)=>{
        if (res.goosCode == action.data.goosCode) res.val = action.data.val
        return res;
      })
      return newState;
    case actions.LOGS_DELETE://删除数组
      newState.logs = newState.logs.filter((res)=>{
        return res.goosCode != action.data.goosCode
      })
      return newState;
    default:
      return newState;
  }
}