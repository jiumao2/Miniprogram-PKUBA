// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.163.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 465
  secure: true,
  auth: {
    user: 'pkubaoutward@163.com', //邮箱账号
    pass: 'PKUBAoutward2015' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  const root_path = cloud.getWXContext().ENV
  // 创建一个邮件对象
  if (event.attachment != 0){
    const fileList = [event.fileID]
    const result = await cloud.getTempFileURL({
      fileList
    }) 

    var mail = {
      // 发件人
      from: 'pkubaoutward@163.com',
      // 主题
      subject: event.subject,
      // 收件人
      to: 'pkubaoutward@163.com',
      // 邮件内容，text或者html格式
      text: event.text, //可以是链接，也可以是验证码
      attachments: 
      [{
          filename: event.attachment,   // 附件名
          path: result.fileList[0].tempFileURL,  // 附件路径
            cid : 'fn_01'  // _id 可被邮件使用
        }]
    }
  }
  else{
    var mail = {
      // 发件人
      from: 'pkubaoutward@163.com',
      // 主题
      subject: event.subject,
      // 收件人
      to: 'pkubaoutward@163.com',
      // 邮件内容，text或者html格式
      text: event.text //可以是链接，也可以是验证码
    }
  }

  let res = await transporter.sendMail(mail);
  return res;
}