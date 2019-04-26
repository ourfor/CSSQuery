//index.js
const app = getApp();
var rd; 

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    keyword:'',   //从客户端输入的查询内容
    propetry: 'cursor',
    titleImage: "./CSSQuery.png"
  },

  keyword:function(event){
    this.setData({
      keyword: event.detail.value
    })
  },
  doSearch:function(event){
    let keyword = null;
    if(event){
      keyword = event.currentTarget.dataset.keyword
      keyword = keyword.toLowerCase();  //忽略大小写
      keyword = keyword.replace("－","-");  //忽略中文分隔符
      keyword = keyword.replace(/ /g,"")
      keyword = keyword.trim();    // 去掉首尾空格
    }
    console.log(keyword)
    console.log(typeof(keyword))
    wx.setStorageSync('keyword',keyword)
    wx.navigateTo({
      url: '/pages/main/main'
    })
  },

  //页面评分·更改
    onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    const db = wx.cloud.database()
    db.collection('css').where(
      {
        'property': this.data['property'],
        'introduction': this.data['introduction'],
        'value': this.data['value']
      }
    ).get({
      success: res => {
        //rd 记录结果集合
        //console.log(res.data)


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