const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const ValidatePhone = (val)=> {
  var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//手机号码
  var isMob = /^0?1[3|4|5|8][0-9]\d{8}$/;// 座机格式
  if (isMob.test(val) || isPhone.test(val)) {
    return true;
  }
  else {
    return false;
  }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  ValidatePhone: ValidatePhone
}
