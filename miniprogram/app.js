const envList = require('./envList')

App({

    onLaunch: function () {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                env: 'cloud-demo-ixs8x',
                traceUser: true,
            });
        }


        this.globalData = {
            contentHeight: 0,
            headerHeight: 0,
            footerHeight: 0,
        };

        //设置组件的高度
        this.setHeight()

    },

    /**
     * 获取手机的高度信息，设置组件的高度
     */
    setHeight() {
        const screenHeight = wx.getSystemInfoSync().screenHeight
        const headerHeight = wx.getMenuButtonBoundingClientRect().bottom + 8
        const footerHeight = screenHeight / 10
        this.globalData.contentHeight = screenHeight - headerHeight
        this.globalData.headerHeight = headerHeight
        this.globalData.footerHeight = footerHeight
    },

});
