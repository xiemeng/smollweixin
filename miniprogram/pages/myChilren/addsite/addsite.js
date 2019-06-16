// pages/myChilren/addsite/addsite.js
import { ValidatePhone} from '../../../utils/util.js'
const db = wx.cloud.database()//获取默认环境下的数据库引用
const dbAddress = db.collection('address')//获取具体某一张表
Page({
  data: {
    userinfo: {//填写的数据
      address: [],//默认选中的省市区
    },
    isphone:false,//手机号是否正确
    isAdd:true,//判断编辑还是更改
    _id:'',//地址id
  },
  bindinput(e){//手机号输入
    console.log(this.data.isphone)
    let data = e.detail.value;
    this.setData({
      isphone: ValidatePhone(data)
    })
  },
  formSubmit: function(e){//提交表单
    let data = e.detail.value;
    
    console.log('form发生了submit事件，携带数据为：', this.data.userinfo)
    if (!data.name){
      wx.showToast({icon:'none',title: '请输入姓名'})
      return
    }
    if (!this.data.isphone) {
      wx.showToast({icon: 'none',title: '请输入正确的电话'})
      return
    }
    if (data.address.length<=0) {
      wx.showToast({icon: 'none',title: '请选择地址'})
      return
    }
    if (!data.detailAdd) {
      wx.showToast({icon: 'none',title: '请填写详细地址'})
    }
    if (this.data.isAdd){
      dbAddress.add({
        data: data,
        success: function (res) {
          wx.navigateBack({
            delta: -1
          })
        },
        fail: function (err) {
          console.error(err)
        }
      })
    }else{
      dbAddress.doc(this.data._id).update({
        data: data,
        success: function (res) {
          wx.navigateBack({
            delta: -1
          })
        },
        fail: function (err) {
          console.error(err)
        }
      })
    }
    
  },
  formReset: function () {//重置表单
    console.log('form发生了reset事件')
  },
  bindRegionChange: function (e) {//3级联动改变
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'userinfo.address': e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (options._id){
      this.setData({
        _id: options._id,
        isphone:true,
        isAdd:false
      })
      dbAddress.doc(options._id).get({
        success: (res) => {
          this.setData({
            userinfo: res.data
          })
          console.log(this.data.userinfo)
        },
        fail: (error) => {
          console.error(error)
        }
      })
    }else{
      this.setData({
        userinfo: {
          address: [],//默认选中的省市区
        },
        _id:'',
        isAdd:true
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})