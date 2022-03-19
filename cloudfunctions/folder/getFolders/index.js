const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud-demo-ixs8x'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const openId = cloud.getWXContext().OPENID
    if (!openId) throw ('openId missing')

    console.log('Get folders open id is ' , openId)

    return db.collection('t_folder').where({
        _openid: openId
    }).get();
}