
Page({
  data: {
    imgUrls: [
      'cloud://develop-7e9e98.6465-develop-7e9e98/imgs/commodity/acd.jpg',
      'cloud://develop-7e9e98.6465-develop-7e9e98/imgs/commodity/afd.jpg',
      'cloud://develop-7e9e98.6465-develop-7e9e98/imgs/commodity/ commodity_c10.jpg'
    ],
    commodityList:[],//商品列表
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
  },
  imageLoad: function (event) {
    //bindload 图片加载的时候自动设定宽度  
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
  }, swiperChange: function () {
    // console.log("current 改变时会触发 change 事件")
  },
  tap:function(event){//跳转详情
    let id = event.currentTarget.dataset.id;
    let mid = event.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '/pages/foodDetail/detail/detail?id=' + id + '&mid=' + mid,
    })
    console.log(event)
  },
  onLoad: function (option) {
    const db = wx.cloud.database()//获取默认环境下的数据库引用
    const dbCommodity = db.collection('commodity')//获取具体某一张表
    dbCommodity.get({
      success:(res)=>{
        this.setData({
          commodityList:res.data
        })
      },
      fail: function (err) {
        console.error(err)
      }
    })
  }
})