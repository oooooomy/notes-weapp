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

    const note = {
        folderId: '',
        title: '',
        content: '',
        createAt: '',
    }

    db.collection('t_note').add({
        data: note
    })
}