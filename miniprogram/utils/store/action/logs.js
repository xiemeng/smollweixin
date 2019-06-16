// 常量定义
export const actions = {
  LOGS_ADD: 'LOGS_ADD',//增加数组
  LOGS_CLEAR: 'LOGS_CLEAR',//清除数组
  LOGS_CHANGE:'LOGS_CHANGE',//改变数组
  LOGS_DELETE:'LOGS_DELETE',//删除数组
}
export function addLogs(text){
  return { type: "LOGS_ADD", text}
}