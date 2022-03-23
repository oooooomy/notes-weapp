const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerHeight: App.globalData.headerHeight,
        footerHeight: App.globalData.footerHeight,
        contentHeight: App.globalData.contentHeight,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const folderId = options.folderId
        console.log(folderId)
    },

    onClickLeft(){
        wx.navigateBack()
    },

   
})