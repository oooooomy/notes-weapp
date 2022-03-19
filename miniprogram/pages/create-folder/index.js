const App = getApp()

const Colors = require('../../constant/color')
const Icons = require('../../constant/icons')

Page({

    data: {
        headerHeight: App.globalData.headerHeight,
        footerHeight: App.globalData.footerHeight,
        contentHeight: App.globalData.contentHeight,
        activeColor: Colors.ColorArray[0],
        activeIcon: Icons.IconArray[0],
        inputTitle: '',
        colorArray: Colors.ColorArray,
        iconArray: Icons.IconArray,
        isCreate: true,
        updateFolder: {},
    },

    onLoad: function (options) {
        if(options.type === 'update'){
            this.setData({
                updateFolder: JSON.parse(options.folder),
                isCreate:  false
            })
        }
    },

    /**
     *添加列表时设置随机颜色,避免用户的列表都是同一个颜色
     */
    /*setRandomData() {
        const color = Colors.ColorArray[Math.floor(Math.random() * Colors.ColorArray.length)]
        const icon = Icons.IconArray[Math.floor(Math.random() * Icons.IconArray.length)]
        this.setData({
            activeColor: color,
            activeIcon: icon,
        })
    },*/

    /**
     *添加列表时，选择颜色
     * @param e
     */
    onClickSelectColor(e) {
        wx.vibrateShort({
            type: 'medium'
        })
        this.setData({
            activeColor: e.currentTarget.dataset.color,
        })
    },

    /**
     *添加列表时，选择图标
     * @param e
     */
    onClickSelectIcon(e) {
        wx.vibrateShort({
            type: 'medium'
        })
        this.setData({
            activeIcon: e.currentTarget.dataset.icon,
        })
    },

    /**
     *键盘输入
     * @param e
     */
    bindKeyInput: function (e) {
        this.setData({
            inputTitle: e.detail.value
        })
    },

    /**
     * 提交
     */
    onSubmit() {
        if (!this.data.inputTitle) {
            wx.showToast({
                title: '请输入名称',
                icon: 'error',
            })
            return
        }
        const folder = {
            icon: this.data.activeIcon,
            color: this.data.activeColor,
            title: this.data.inputTitle,
            count: 0,
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: 'folder',
            data: {
                type: 'createFolder',
                folder: folder
            }
        }).then((res) => {
            console.log(res)
            wx.showToast({title: '添加成功'})
            wx.redirectTo({
                url: '/pages/index/index'
            })
        })
    },

    onClickLeft() {
        wx.navigateBack()
    },

})