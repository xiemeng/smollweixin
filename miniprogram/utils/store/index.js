const store = {  //简单状态管理
  debug:true,//开启调试
  state:{//声明数据
    carList:[],//购物车数据状态
  },
  mutations(stateName,newState,index){//唯一改变状态途径，禁止直接从state改变状态,
    if (this.debug) console.log(`要改变的状态:${stateName},改变后的值：${newState}`)
    if (index || index === 0){
      this.state[stateName][index] = newState;
      return;
    }else{
      this.state[stateName] = newState;
    }
  }
}
module.exports = {
  store:store
}