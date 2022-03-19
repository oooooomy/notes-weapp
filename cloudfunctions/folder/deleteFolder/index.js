const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud-demo-ixs8x'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const folderId = event.folderId
    if (!folderId) throw ('folderId missing')

    db.collection('t_folder').where({
        _id: folderId
    }).remove({
        //删除成功
        success: function(){
            db.collection("t_note").where({
                folderId: folderId
            }).remove()
        }
    })
}