const db = wx.cloud.database()
const todos = db.collection('todos')
// todos.doc('W71Ypd2AWotka_8i').get({
//   success: function (res) {
//     // res.data 包含该记录的数据
//     console.log(res.data)
//   },
//   fail:function(error){
//     console.error(error)
//   }
// })
// todos.doc('W71Ypd2AWotka_8i').update({
//   data:{
//     done:true
//   },
//   success:function(res){
//     console.log(res)
//   },
//   fail:function(error){
//     console.error(error)
//   }
// })
// todos.doc('W71Ypd2AWotka_8i').set({
//   data:{
//     done: true
//   },
//   success:(res)=>{
//     console.log(res)
//   },
//   fail:(res)=>{
//     console.error(res)
//   }
// })
// todos.add({
//   data:{
//     description:'我是增加的数据',
//     due:new Date(),
//     tags:[1,2,3,4],
//     done:true,
//     style:{color:"blue"}
//   }
// })
// todos.doc('W71Ypd2AWotka_8i').remove({
//   success: (res) => {
//     console.log(res)
//   },
//   fail:(res)=>{
//     console.error(res)
//   }
// })
// wx.cloud.callFunction({
//   name:'sum',
//   data:{
//     a:3,
//     b:4
//   },
//   success: (res)=>{
//     console.log(res)
//   },
//   fail:console.error
// })
Page({
  data: {
    userinfo:{},//用户信息
    avatarUrl:'',//用户头像
  },
  onLoad:function(){
    // 判断个人信息是否存在，
    wx.getStorage({
      key: 'userinfo',
      success: (res)=> {
        let data = JSON.parse(res.data)
        this.setData({
          avatarUrl: data.avatarUrl,
          userInfo: data
        })
        console.log(data)
      },
      fail:function(error){
        console.error(error)
      }
    })
  },
  // 去微信授权，获取个人信息
  getuserinfo: function (res) {
    console.log(res)
    if (res.detail.userInfo){//授权成功
      this.setData({
        avatarUrl: res.detail.userInfo.avatarUrl,
        userInfo: res.detail.userInfo
      })
      wx.setStorage({
        key: 'userinfo',
        data: JSON.stringify(res.detail.userInfo),
      })
    }else{  //用户拒绝授权的情况
      console.log('用户拒绝了授权')
      wx.showToast({
        icon:'none',
        title: '拒绝授权将影响正常使用'
      })
    }
    
  }
})