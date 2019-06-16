function initMpState() { // mp-redux初始化函数，在这里形成一个独立作用域
  const reducers = {};  // 该函数作用域内的数据
  const finalState = {};  // 该函数作用域内的数据 
  const listeners = [];  // 该函数作用域内的数据
  let injectMethod = null;  // 该函数作用域内的数

  function getStore() { // 用于访问沙盒内数据的接口
    return finalState;
  }

  /* 
modules，这里参考redux，我们可以拆分很多业务模块，每个业务模块会有自己的业务模型，因此这里的modules是一个对象，而key就是业务模块的名字value就是处理业务模型的纯函数。
 modules{
   key:value, //value  纯函数
   key:value
 }
这里提供一injectFunc 主要是因为小程序在系统加载后就初始化，
因此我们需要劫持特定api来在这个api中同步store中数据到当前显示的页面中。为什么不写死成小程序的onShow？主要是以后考虑百度小程序，支付宝小程序。这样更灵活。
*/
  function createStore(modules, injectFunc) {
    if (injectFunc && typeof injectFunc === 'string') {
      injectMethod = injectFunc;
    }
    // 我们将用户自己定义的业务模型(model)保存到沙盒内的reducers中
    if (modules && typeof modules === 'object') {
      const keys = Object.keys(modules);
      const len = keys.length;

      for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (modules.hasOwnProperty(key) && typeof modules[key] === 'function') {
          reducers[key] = modules[key];
        }
      }
    }
    // 对store进行初始化
    dispatch({ type: '@MPSTATE/INIT' });
  }

  /*
  action{
    
  }
 * 这里一定要注意，action是一个原生JS对象，而不是函数，Redux的异步是通过redux-thunk来实现的，但是我的诉求是需要让我们应用中的业务逻辑更加容易被测试，因此也就没有去提供支持，其实实现起来也很简单。可以参考我做的[vue-with-redux源码](https://github.com/ryouaki/vue-with-redux/blob/master/src/index.js)
*/
  function dispatch(action) {
    // debugger
    const keys = Object.keys(reducers);
    const len = keys.length;
    // 这个循环用于遍历model来重新计算出新的store
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      const currentReduce = reducers[key];
      const currentState = finalState[key];

      const newState = currentReduce(currentState, action);

      finalState[key] = newState;
    }

    if (this) {
      // 这里是根据组件内部的订阅规则来将新的数据模型通过setData注入到页面中
      const componentState = this.mapStoreToState(finalState) || {};
      // 这里提供了对react和vue的支持，因此也就导致代码多了几行，还在测试中。
      if (this.setData) { // 小程序
        this.setData({ ...componentState })
      } else if (this.setState) { // react什么的吧
        this.setState({ ...componentState })
      } else { // VUE
        const propKeys = Object.keys(componentState);
        for (let i = 0; i < propKeys.length; i++) {
          this[propKeys[i]] = componentState[propKeys[i]];
        }
      }
    }
  }

  /* 
 *mapStoreToState，用于用户自己将自己关注的业务数据状态订阅到自己的页面中
 mapStoreToState   Function
 component  Object
 */
  function connect(mapStoreToState, component) {  //用于关联小程序Page对象的高级API
    if (!component || typeof component !== 'object') {
      throw new Error('mpState[connect]: Component must be a Object!');
    }

    if (!mapStoreToState || typeof mapStoreToState !== 'function') {
      throw new Error('mpState[connect]: mapStoreToState must be a Function!');
    }
    // 我们需要将redux相关的函数和状态注入到用户的page定义中
    const newComponent = { ...component };
    // 拿到用户自己在页面定义的data，我们需要保留原来的状态
    const data = component.data || {};
    // 获取用户订阅的store中的状态
    const extraData = mapStoreToState(finalState);

    if (!extraData || typeof extraData !== 'object') {
      throw new Error('mpState[connect]: mapStoreToState must return a Object!');
    }
    // 合并用户自己页面中的状态，和通过connect注入的store中的状态，这里我的实现有点不好
    let newData = null;

    if (typeof data === 'function') {
      newData = {
        ...data(),
        ...extraData
      }
    } else {
      newData = {
        ...data,
        ...extraData
      }
    }
    // 注入到Page对象中
    if (newData) {
      newComponent.data = newData;
    }
    // 获取需要劫持的生命周期钩子，因为每个页面不一定都劫持同一个生命周期，因此提供了一个各个页面可以自定义修改劫持钩子的方法
    const injectFunc = component.getInjectMethod;

    const methods = component.methods || {};

    const newLiftMethod = injectFunc && injectFunc() || injectMethod;
    const oldLiftMethod = component[newLiftMethod];
    // 注入dispatch api
    methods.dispatch = dispatch;

    newComponent.methods = methods;
    newComponent.dispatch = dispatch;
    newComponent.mapStoreToState = mapStoreToState;
    //生命周期钩子劫持
    if (newLiftMethod) {
      newComponent[newLiftMethod] = function () {
        if (this) {
          // 在劫持的钩子中同步store的数据到页面
          this.dispatch({});
          oldLiftMethod && oldLiftMethod.call(this, arguments);
        }
      }
    }
    // 返回新的Page对象
    return newComponent;
  }

  return {
    createStore,
    dispatch,
    connect,
    getStore
  }
}

module.exports = initMpState();