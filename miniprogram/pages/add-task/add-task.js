const App = getApp()

import {getFormatDateFrame} from "../../utils/time"

import {guid} from "../../utils/uuid"

Page({

    data: {
        grades: ['无', '低', '中', '高'],
        headerHeight: App.globalData.headerHeight,
        footerHeight: App.globalData.footerHeight,
        contentHeight: App.globalData.contentHeight,
        dateFrame: getFormatDateFrame(),
        taskList: [],
        selectIndex: 0,
        selectGrade: '无',
        date: '',
        address: '',
        time: '',
        notice: true,
    },

    onLoad: function (options) {
        const index = parseInt(options.index)
        this.setData({
            selectIndex: index,
            taskList: wx.getStorageSync("taskList")
        })
    },

    /**
     * 选择定位
     */
    onSelectLocation() {
        let _this = this
        wx.chooseLocation({
            success(res) {
                _this.setData({
                    address: res.address + res.name
                })
            },
        })
    },

    /**
     *标题输入
     * @param e
     */
    bindTitleInput(e) {
        this.setData({
            title: e.detail.value
        })
    },

    /**
     * 描述输入
     * @param e
     */
    bindDescriptionInput(e) {
        this.setData({
            description: e.detail.value
        })
    },

    /**
     * 日期选择
     * @param e
     */
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },

    /**
     * 时间选择
     * @param e
     */
    bindTimeChange(e) {
        this.setData({
            time: e.detail.value
        })
    },

    /**
     * picker 选择列表
     * @param e
     */
    bindTaskPickerChange(e) {
        this.setData({
            selectIndex: e.detail.value
        })
    },

    /**
     * picker 选择优先级
     * @param e
     */
    bindGradePickerChange(e) {
        this.setData({
            selectGrade: this.data.grades[e.detail.value]
        })
    },

    /**
     * 微信通知
     * @param e
     */
    bindNoticeSwitch(e) {
        this.setData({
            notice: e.detail.value
        })
    },

    /**
     * 提交
     */
    onSubmit() {
        if (!this.data.title) {
            wx.showToast({
                title: '请输入标题',
                icon: 'error',
            })
            return
        }
        let _this = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        let time = this.data.date + ' ' + this.data.time + ':00'
        let notice_at = new Date(time.replace(/-/g,'/')).valueOf()
        console.log(notice_at)
        const form = {
            item_id: guid(),
            complete: false,
            notice: this.data.date && this.data.time ? this.data.notice : false,
            address: this.data.address,
            title: this.data.title,
            description: this.data.description,
            date: this.data.date,
            time: this.data.time,
            notice_at: notice_at,
            grade: this.data.selectGrade
        }
        let task = this.data.taskList[this.data.selectIndex];
        task.list.push(form)
        wx.cloud.callFunction({
            name: 'task',
            data: {
                type: 'pushTaskItem',
                _id: task._id,
                item: form,
            }
        }).then((res) => {
            let taskList = wx.getStorageSync("taskList")
            taskList[_this.data.selectIndex] = task
            wx.setStorageSync("taskList", taskList)
            wx.showToast({title: '添加成功'})
            wx.redirectTo({
                url: '/pages/list/list?index=' + _this.data.selectIndex
            })
        })
    },

    onClickLeft() {
        wx.navigateBack()
    },

})