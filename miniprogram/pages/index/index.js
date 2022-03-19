import {getFormatWeek} from "../../utils/time";
import {getRandomWord} from "../../constant/word";

const App = getApp()

Page({

    data: {
        week: getFormatWeek(),
        word: getRandomWord(),
        top: wx.getMenuButtonBoundingClientRect().top,
        headerHeight: App.globalData.headerHeight,
        footerHeight: App.globalData.footerHeight,
        contentHeight: App.globalData.contentHeight,
        showData: false,
        showTitle: false,
        showSetting: false,
        showAction: false,
        taskList: [],
        folders: [],
        selectIndex: 0,
    },

    onLoad(query) {
        this.loadIndexData()
    },

    /**
     * 获取用户列表数据
     */
    loadIndexData() {
        let _this = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: 'folder',
            data: {type: 'getFolders'}
        }).then((res) => {
            const folders = res.result.data ? res.result.data : []
            _this.setData({
                folders: folders,
                showData: true,
            })
            wx.hideLoading()
        })
    },

    /**
     * 监听页面scroll滑动
     * 滑动后显示顶部的Title
     * @param e
     */
    handleScroll(e) {
        if (e.detail.scrollTop > 50) this.setData({showTitle: true})
        else this.setData({showTitle: false})
    },

    /**
     *点击列表卡片
     * @param e
     */
    onClickCard(e) {
        const index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: '/pages/list/list?index=' + index
        })
    },

    onClickLeft() {
        this.setData({showSetting: true})
    },

    /**
     * 点击添加提醒事项
     */
    onAddTask() {
        wx.navigateTo({
            url: '/pages/create-note/index'
        })
    },

    /**
     * 点击添加文件夹
     */
    onAddList() {
        wx.navigateTo({
            url: '/pages/create-folder/index?type=create'
        })
    },

    /**
     * 刷新句子
     */
    refreshWord() {
        this.setData({
            word: getRandomWord()
        })
    },

    onShowAction(e) {
        this.setData({
            selectIndex: e.currentTarget.dataset.index,
            showAction: true,
        })
    },

    /**
     * 编辑文件夹
     */
    onEditFolder(){
        const selectFolder = this.data.folders[this.data.selectIndex]
        wx.navigateTo({
            url: '/pages/create-folder/index?folder=' + JSON.stringify(selectFolder) + '&type=update' 
        })
    },

    /**
     * 点击删除事项
     */
    onDelete() {
        let _this = this
        const index = this.data.selectIndex
        const folder = this.data.folders[index]
        wx.showModal({
            title: '删除文件夹',
            content: '文件夹中的笔记内容将无法恢复，确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    _this.setData({
                        showAction: false,
                    })
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    })
                    wx.cloud.callFunction({
                        name: 'folder',
                        data: {
                            type: 'deleteFolder',
                            folderId: folder._id,
                        }
                    }).then((res) => {
                        const list = _this.data.folders
                        list.splice(index, 1)
                        _this.setData({
                            folders: list
                        })
                        wx.hideLoading()
                    })
                }
            }
        })
    },

    onCloseAction() {
        this.setData({
            showAction: false,
        })
    },

    onCloseSetting() {
        this.setData({showSetting: false})
    },

    onCloseAddList() {
        this.setData({showAddList: false})
    },

})