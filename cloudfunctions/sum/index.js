// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(event.a + event.b)
    }, 2000)
  })
  
  
}
