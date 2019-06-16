var url = 'https://www.yindies.com/mapi';
function request(data){
  return new Promise(function (resolve, reject) {
    let requestType = "POST";
    wx.request({
      url: url, //请求地址
      data: data,
      header: {
        'content-type': requestType == 'POST' ?       'application/x-www-form-urlencoded' : 'application/json'
      },
      method: requestType,
      complete: function (res) {
        if (res.statusCode == 200) {   //请求成功
          console.log(res.data)
          resolve(res.data)
        } else {
          reject(res)
          console.log(res)
        }

      }
    })
  })
}

module.exports = request;