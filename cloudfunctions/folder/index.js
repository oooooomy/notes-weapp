const createFolder = require('./createFolder/index');
const getFolders = require('./getFolders/index');

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'createFolder':
            return await createFolder.main(event, context);

        case 'getFolders':
            return await getFolders.main(event, context);
    }
};
