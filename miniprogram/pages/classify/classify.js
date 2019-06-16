// 使用connect来注入需要订阅的状态，并且mp-redux会在页面对象中自动注入dispatch方法 
const mpState = require('../../utils/store/mpredux.js');
import { actions } from "../../utils/store/action/logs.js";
console.log(actions)
function getStore(state){
  console.log(state)
  return {
    userInfo: state.userInfo.userInfo,
    logs: state.logs.logs
  }
}
const newPage = { // 在这里所有的业务数据都保存在store中，所以页面如果只有业务数据的话，是不需要data属性的。
  clearLogs() {//清空
    this.dispatch({ // 通过dispatch方法来发出action，从而更新store中的数据
      type: actions.LOGS_CLEAR
    })
  },
  deleteLogs(){//删除
    this.dispatch({ 
      type: actions.LOGS_DELETE,
      data:{
        goosCode: 1235
      }
    })
  },
  cahngeLogs(){//改变
    this.dispatch({
      type: actions.LOGS_CHANGE,
      data: {
        val: 19,
        goosCode: 1235
      }
    })
  },
  addLogs(){//增加
    this.data.goosCode++
    this.data.val++
    this.dispatch({
      type: actions.LOGS_ADD,
      data:{
        val: this.data.val,
        goosCode: this.data.goosCode
      }
    })
    // this.setData({
    //   logs:this.data.logs
    // })
  },
  data:{
    index:1,
    goosCode:1233,
    val:1
  }
}
const returnPage = mpState.connect(getStore, newPage)
Page(returnPage)