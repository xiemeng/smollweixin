Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    // 这里是一些组件内部数据
    isMove: false,//是否移动
    startX: 0, //开始坐标
    startY: 0
  },
  methods: {
    // 这里是一个自定义方法
    touchstart: function (even) {
      this.setData({
        startX: even.changedTouches[0].clientX,
        startY: even.changedTouches[0].clientY,
      })
    },
    touchmove: function (even) {
      var index = even.currentTarget.dataset.index,//当前索引
        startX = this.data.startX,//开始X坐标
        startY = this.data.startY,//开始Y坐标
        touchMoveX = even.changedTouches[0].clientX,//滑动变化坐标
        touchMoveY = even.changedTouches[0].clientY,//滑动变化坐标
        //获取滑动角度
        angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (touchMoveX > startX) {
        this.setData({
          isMove: false
        })
      } else {//左滑
        this.setData({
          isMove: true
        })
      }


    },
    /**    
    * 计算滑动角度   
    * @param {Object} start 起点坐标   
    * @param {Object} end 终点坐标   
    */
    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
  },
  created() {//在组件实例进入页面节点树时执行
    console.log('在组件实例进入页面节点树时执行')
  },
  ready() { //在组件布局完成后执行
    console.log('在组件布局完成后执行')
  }
})