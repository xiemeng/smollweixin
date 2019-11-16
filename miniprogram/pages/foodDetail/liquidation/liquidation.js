// pages/foodDetail/liquidation/liquidation.js
import { store } from "../../../utils/store/index.js"
const db = wx.cloud.database()//获取默认环境下的数据库引用
const dbAddress = db.collection('address')//获取具体某一张表
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],//购物车数据
    allPrice:'',//总价
    postage:0,//邮费
    userinfo:'',// 地址信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let allPrice = 0;
    let carList = store.state.carList.filter(function (res) {
      return res.isSelect
    })
    for (let i = 0; i < carList.length; i++) {
      allPrice = allPrice + (carList[i].nums * carList[i].price)
    }
    this.setData({
      allPrice: allPrice,
      carList: carList
    })
  },
  settlement(){//提交订单

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
  },
  getData() {
    dbAddress.where({ _openid: app.globalData.openid }).get({
      success: (res) => {
        console.log(res)
        if(res && res.data && res.data.length>0){
          this.setData({
            userinfo: res.data[0]
          })
        }
      },
      fail: function (err) {
        console.error(err)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})