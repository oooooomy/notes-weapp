const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud-demo-ixs8x'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const openId = cloud.getWXContext().OPENID
    if (!openId) throw ('openId missing')

    const folder = event.folder
    folder._openid = openId

    console.log('This _openid = ',  openId)
    console.log(folder)

    db.collection('t_folder').add({
        data: folder
    })
}