// miniprogram/pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    rd: '',
    property: 'main',
    grammar: {},
    value: {},
    example: '',
    hasChild: false,
    introduction: {},
    value_pic: "cloud://data-4a115d.6461-data-4a115d/book_mark_life.png",
    //页面评分
    starIndex3: 0,
    md: ""
  },
  //页面评分·更改
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    let keyword = wx.getStorageSync('keyword');
    this.setData({ property: keyword });

    const db = wx.cloud.database()
    db.collection('css').where(
      {
        'property': this.data['property']
      }
    ).get({
      success: res => {
        //rd 记录结果集合
        //rd 记录结果集合
        let rd = res.data;
        //console.log('read database successful',rd)
        if(rd==''){
          console.log("查询失败");
          wx.navigateBack()
        }
        rd = rd[0];
        rd = rd['content'];
        // console.log(rd)
        // console.log(rd['example'])
        this.setData({ hasChild: rd['hasChild'] })
        this.setData({ example: rd['example'] })
        this.setData({ md: "```html\n" + rd['example'] + "\n```" })
        this.setData({ introduction: rd['introduction'] })
        this.setData({ value: rd['value'] })
        this.setData({ grammar: rd['grammar'] })

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          titile: 'read failed'
        })
        console.error('read failed', err)
      }
    })




    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})