const db = wx.cloud.database()//获取默认环境下的数据库引用
const dbShopCar = db.collection('shopCar')//获取具体某一张表
const app = getApp()
import {store} from "../../utils/store/index.js"
Page({
  data: {
   carList:[],//购物车数量
   allPrice:0,//总价格
   isAllSelect:true,//是否全部选中
  },
  onShow:function(){//得到数据
    dbShopCar.where({ _openid: app.globalData.openid }).get({
      success: (res) => {
        this.setData({
          carList: res.data
        })
        store.mutations('carList', res.data)
        this.getAllPrice(res.data)
        console.log(res.data)
      },
      fail: function (err) {
        console.error(err)
      }
    })
  },
  getAllPrice(newValue){//得到价格，判断全选，
    let allPrice = 0;
    let isAllSelect = true;
    for (let i = 0; i < newValue.length; i++) {
      console.log(newValue[i])
      let deepValue = JSON.parse(JSON.stringify(newValue[i]))
      delete deepValue._id
      delete deepValue._openid
      dbShopCar.doc(newValue[i]._id).update({
        data: deepValue,
        success: () => {
          console.log(i)
        },
        fail: (error) => {
          console.error(error)
        }
      })
      
      if (!newValue[i].isSelect){
        isAllSelect = false;
      }else{
        allPrice = allPrice + (newValue[i].nums * newValue[i].price)
        console.log(newValue[i].nums, newValue)
      }
    }
    this.setData({
      allPrice: allPrice,
      isAllSelect: isAllSelect
    })
    store.mutations('carList', this.data.carList)
  },
  selectAll(){//全选
    if (this.data.isAllSelect){
      let carList = this.data.carList;
      for (let i = 0; i < carList.length; i++) {
        carList[i].isSelect = false;
      }
      this.setData({
        carList: carList
      })
    }else{//反选
      let carList = this.data.carList;
      for (let i = 0; i < carList.length;i++){
        carList[i].isSelect = true;
      }
      this.setData({
        carList: carList
      })
    }
    this.getAllPrice(this.data.carList)
  },
  checked(enevt){//选中
    let index = enevt.currentTarget.dataset.index;
    let carList = this.data.carList;
    carList[index].isSelect = true;
    this.setData({
      carList: carList
    })
    this.getAllPrice(this.data.carList)
  },
  close(enevt){//取消选中
    let index = enevt.currentTarget.dataset.index;
    let carList = this.data.carList;
    carList[index].isSelect = false;
    this.setData({
      carList: carList
    })
    this.getAllPrice(this.data.carList)
  },
  settlement(){//结算
    let hasData = this.data.carList.filter(function(res){
      return res.isSelect
    })
    if (hasData.length>0){
      wx.navigateTo({
        url: '/pages/foodDetail/liquidation/liquidation',
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
    }
    
  },
  deleteFood(event){//删除商品
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除购物车吗?',
      success:(res)=>{
        if (res.confirm){
          dbShopCar.doc(id).remove({
            success: (res) => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              })
              this.data.carList.splice(index,1)
              this.setData({
                carList: this.data.carList
              })
              this.getAllPrice(this.data.carList)
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
  },
  classify() {//添加商品
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  numData(event) {//监听子组件传过来的事件
    this.setData({
      carList: store.state.carList
    })
    this.getAllPrice(store.state.carList)
  },
})