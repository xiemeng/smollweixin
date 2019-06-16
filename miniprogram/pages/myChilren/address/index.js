// pages/myChilren/purchase/index.js
const db = wx.cloud.database()//获取默认环境下的数据库引用
const dbAddress = db.collection('address')//获取具体某一张表
const app = getApp()

Page({
  data: {
    userinfo:[],//地址数据
    isAll:false,//是否不能新增
    isPage:false,//数据请求完再展示页面
  },
  addsite: function () {//新增
    if (this.data.userinfo.length>=5){
      this.setData({
        isAll:true
      })
      wx.showToast({
        title: '最多只能添加5个地址',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/myChilren/addsite/addsite',
      })
    }
   
  },
  deleteRess:function(event){//删除
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    wx.showModal({
      title: '是否删除该地址',
      success:(res)=>{
        if (res.confirm){
          dbAddress.doc(id).remove({
            success: (res) => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              })
              this.getData()
            },
            fail: (res) => {
              wx.showToast({
                title: '删除失败',
                icon: 'node',
              })
            }
          })
        }
      }
    })
    console.log(event)
  },
  getData(callback){
    dbAddress.where({ _openid: app.globalData.openid }).get({
      success: (res) => {
        this.setData({
          userinfo: res.data
        })
        if (this.data.userinfo.length >= 5) {
          this.setData({
            isAll: true
          })
        }else{
          this.setData({
            isAll: false
          })
        }
        if (callback){
          callback()
        }
      },
      fail: function (err) {
        console.error(err)
      }
    })
  },
  onLoad:function(){
    wx.showLoading({
      title: '加载中',
    })
    this.getData(()=>{
      this.setData({
        isPage:true
      })
      wx.hideLoading()
    })
    
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(222)
    this.getData()
  },
  onReady: function () {
    console.log(333)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})