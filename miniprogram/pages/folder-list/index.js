const App = getApp()

Page({

    data: {
        headerHeight: App.globalData.headerHeight,
        footerHeight: App.globalData.footerHeight,
        contentHeight: App.globalData.contentHeight,
        showAction: false,
        folderId: '',
        selectIndex: 0,
        taskIndex: 0,
        task: {},
    },

    onLoad: function (options) {
        const folderId = options.folderId
        if (!folderId) {
            wx.showToast({
                title: '参数缺失',
                icon: 'error',
                duration: 2000
            })
        }
        this.setData({
            folderId: folderId,
        })
    },

    /**
     * 点击添加提醒事项
     */
    onAddTask() {
        wx.redirectTo({
            url: '/pages/create-note/index?folderId=' + this.data.folderId
        })
    },

    onShowAction(e) {
        this.setData({
            selectIndex: e.currentTarget.dataset.index,
            showAction: true,
        })
    },

    onCloseAction() {
        this.setData({
            showAction: false,
        })
    },

    /**
     * 点击完成事项
     */
    onComplete() {
        wx.vibrateShort({
            type: 'medium'
        })
    },

    /**
     * 点击删除事项
     */
    onDelete() {
        let _this = this
        let selectIndex = _this.data.selectIndex
        let list = _this.data.task.list
        let selectItem = list[selectIndex]
        console.log('delete _id = ', _this.data.task._id)
        console.log('delete item_id = ', selectItem.item_id)
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: 'task',
            data: {
                type: 'deleteTaskItem',
                _id: _this.data.task._id,
                item_id: selectItem.item_id
            }
        }).then((res) => {
            list.splice(selectIndex, 1)
            _this.setData({
                'task.list': list,
                showAction: false,
            })
            let taskList = wx.getStorageSync("taskList")
            taskList[_this.data.taskIndex].list = list
            wx.setStorageSync("taskList", taskList)
            wx.hideLoading()
        })
    },

    /**
     * 点击删除事项
     */
    onUpdateTask() {
        wx.navigateTo({
            url: '/pages/add-task/add-task'
        })
    },

    onClickLeft() {
        wx.navigateBack()
    },

})