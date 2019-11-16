import { store } from "../../../utils/store/index.js"
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    datas: {
      type: Object,
      value: 'default value',
    },
    index: {  //传进来的id
      type: [String, Number],
      default: 0
    },
    name: {  //名字
      type: [String, Number],
      value: ''
    },
    price: {  //价格
      type: [String, Number],
      value: ''
    },
    min: {   //最小值
      type: [String, Number],
      value: 1
    },
    max: {   //最大值
      type: [String, Number],
      value: 99
    },
    wrapValue: {   //传进来的值
      type: [String, Number],
      value: 1
    }
  },
  data: {
    // 这里是一些组件内部数据
    value: 1
  },
  methods: {
    // 这里是一个自定义方法
    mins(event) {   //减少	
      if (this.data.value <= this.data.min) {
        this.setData({
          value:this.data.min
        })
        var myEventDetail = {
          val: this.data.value
        } // detail对象，提供给事件监听函数
        
        this.data.datas.nums = this.data.value
        store.mutations('carList', this.data.datas, this.data.index)
        this.triggerEvent('numData', myEventDetail)
      } else {
        this.setData({
          value: this.data.value-1
        })
        var myEventDetail = {
          val: this.data.value
        } // detail对象，提供给事件监听函数
        
        this.data.datas.nums = this.data.value
        store.mutations('carList', this.data.datas, this.data.index)
        this.triggerEvent('numData', myEventDetail)
      }
    },
    adds(event) {
      if (this.data.value >= this.data.max) {
        var myEventDetail = {
          val: this.data.value
        } // detail对象，提供给事件监听函数
        
        this.data.datas.nums = this.data.value
        store.mutations('carList', this.data.datas, this.data.index)
        this.triggerEvent('numData', myEventDetail)
      } else {
        this.setData({
          value: this.data.value+1
        })
        var myEventDetail = {
          val: this.data.value
        } // detail对象，提供给事件监听函数
        
        this.data.datas.nums = this.data.value
        store.mutations('carList', this.data.datas, this.data.index)
        this.triggerEvent('numData', myEventDetail)
      }
    }
  },
  created() {//在组件实例进入页面节点树时执行
    
  },
  ready() { //在组件布局完成后执行
    this.setData({
      value: this.data.wrapValue
    })
   
  }
})