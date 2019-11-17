// pages/foodDetail/detail/detail.js
const db = wx.cloud.database()//获取默认环境下的数据库引用
const dbShopCar = db.collection('shopCar')//获取具体某一张表
const app = getApp()
Page({
  data: {
    imgUrls: [
      'cloud://develop-7e9e98.6465-develop-7e9e98-1257774716/imgs/commodity/afd.jpg',
      'cloud://develop-7e9e98.6465-develop-7e9e98-1257774716/imgs/commodity/acd.jpg'
    ],
    car: {
      autoplay: true,//是否自动切换  
      indicatorDots: true,//是否显示圆点  
      interval: 5000,//自动切换间隔  
      duration: 500, //滑动动画时长  
      indicatorColor: "#ffe6b3",//滑动圆点颜色  
      indicatorActiveColor: "#fff", //当前圆点颜色  
      current: 0, //当前所在页面的 index  
      circular: true  //是否采用衔接滑动  
    },
    datainfo:{},//商品信息
    nums:1,//数量
    carNums:0,//购物车数量
    mid:'',//商品唯一id
    carList:[],//购物车数据
  },
  imageLoad: function (event) {
    //bindload 图片加载的时候自动设定宽度  
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
  }, swiperChange: function () {
    // console.log("current 改变时会触发 change 事件")
  },
  numData(event){//监听子组件传过来的事件
    console.log(event)
    this.setData({
      nums: event.detail.val
    })
   
  },
  addCar(){//加入购物车
    let data = {
      name: this.data.datainfo.name,
      imgs: this.data.datainfo.imgs,
      price: this.data.datainfo.price,
      nums: this.data.nums,
      mid: this.data.mid,
      isSelect:true
    }
    for (let i = 0, length = this.data.carList.length;i<length;i++){
      if (this.data.mid == this.data.carList[i].mid){//存在，更改
        data.nums = data.nums + this.data.carList[i].nums;
        console.log(this.data.carList[i])
        dbShopCar.doc(this.data.carList[i]._id).update({
          data: data,
          success:()=>{
            wx.showToast({
              title: '加入购物车成功',
            })
          },
          fail:()=>{
            wx.showToast({
              title: '加入购物车失败',
              icon: 'none'
            })
          }
        })
        return;
      }
    }
    
    //不存在，添加
    dbShopCar.add({
      data: data,
      success: (res) => {
        wx.showToast({
          title: '加入购物车成功',
        })
        data._id = res._id;
        this.data.carList.push(data)
        this.setData({
          carNums: this.data.carNums + 1,
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '加入购物车失败',
          icon: 'none'
        })
      }
    })
  },
  classify(){//打开购物车
    wx.switchTab({
      url: '/pages/trolley/trolley',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid: options.mid
    })
    const db = wx.cloud.database()//获取默认环境下的数据库引用
    const dbCommodity = db.collection('commodity')//获取具体某一张表
    dbCommodity.doc(options.id).get({
      success: (res) => {
       this.setData({
         datainfo:res.data
       })
      },
      fail: function (err) {
        console.error(err)
      }
    })
    
    dbShopCar.where({ _openid: app.globalData.openid }).get({
      success:(res)=>{
        this.setData({
          carNums:res.data.length,
          carList:res.data
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})