//index.js
const app = getApp();
var rd; 

var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
var arrayHeight = 0;

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    quickId: '5cc29cd28387daf78a191bde',
    keyword:'',   //从客户端输入的查询内容
    propetry: 'cursor',
    titleImage1: "./CSSQuery.png",
    titleImage: "./logo.png",
    keywordSet: {},
    inputLegal: "",
    exist: false,
    hotSearch: {},
    times: [1,2,3],
    hotId: "hot",
    hideScroll: true,  //联想框列表
    selectWord: [], //联想供用户选择的关键字
    selectSet: ["text-align","text-content","text-uppercase"],
    inputValue: "",
  },

  keyword:function(event){
    this.setData({
      keyword: event.detail.value
    })
    let e = event;
    var prefix = e.detail.value
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      // 对于数组array进行遍历，功能函数中的参数 `e`就是遍历时的数组元素值。
      this.data.selectSet.forEach(function (e) {
        // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
        if (e.indexOf(prefix) != -1) {
          console.log(e);
          newSource.push(e)
        }
      })
    };
    // 如果匹配结果存在，那么将其返回，相反则返回空数组
    if (newSource.length != 0) {
      this.setData({
        // 匹配结果存在，显示自动联想词下拉列表
        hideScroll: false,
        selectWord: newSource,
        arrayHeight: newSource.length * 71
      })
    } else {
      this.setData({
        // 匹配无结果，不现实下拉列表
        hideScroll: true,
        selcetWord: []
      })
    }
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
    //判断是否存在这样的属性
    let SearchSet = this.data['keywordSet'];
    let exist = SearchSet.hasOwnProperty(keyword);
    if(exist){
      this.setData({
        inputLegal: ""
      })
      wx.setStorageSync('keyword',keyword)
      wx.navigateTo({
      url: '/pages/main/main'
      })
    }
    else{
      //console.log("不存在这样的属性");
      this.setData({
        inputLegal: "不存在这样的属性"
      })
    }

    
  },

  //处理联想词汇点击
  itemtap: function(event){
      this.setData({
        hideScroll: true,
        selectWord: [],
        keyword: event.currentTarget.dataset.keyword,
        inputValue: event.currentTarget.dataset.keyword
      });
    let keyword = event.currentTarget.dataset.keyword;
      wx.setStorageSync('keyword', keyword);
      wx.navigateTo({
        url: '/pages/main/main'
      });
      //console.log(this.data['keyword'])
  },

  //点击热门词汇按钮
  hotSearch: function(event){
      //console.log("被点击了");
      let keyword = event.currentTarget.dataset.keyword;
      //console.log(keyword)
      wx.setStorageSync('keyword', keyword)
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

    const db = wx.cloud.database();
    db.collection('quick').doc(this.data['quickID']).get({
      success: res => {
        this.setData({
          keywordSet: res.data.quick
        })
        //console.log(this.data['keywordSet']);
        let keywordSet = this.data['keywordSet']
        let keywordArray = new Array();
        for(let i in keywordSet){
          //console.log(i);
          keywordArray.push(i);
        }
        //console.log(keywordArray)
        //this.setData({selectSet:keywordArray});
        console.log(this.data['selectSet']);
        this.setData({
          selectSet: keywordArray
        });
        console.log(this.data['selectSet']);

      },
      fail: () => {
        console.log("未查询到预期结果");
      }
    })

    //获取搜索热词
    db.collection("hot").doc(this.data['hotId']).get({
      success: res=>{
        //console.log(res.data);
        this.setData({hotSearch:res.data.keyword})
        //console.log(this.data['hotSearch'])
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


  onReady: function () {
    this.position = {
      x: 200,
      y: 200,
      vx: 2,
      vy: 2
    }

    this.drawBall()
  },
  drawBall: function () {
    var p = this.position
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    var context = wx.createContext(),
      x = context,
      m = Math,
      r = 0,
      u = m.PI * 2,
      f = 90,
      v = m.cos,
      z = m.random,
      q,
      w = 400,
      h = 400;
    x.scale(1, 1)

    function i() {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
      while (q[1].x < w + f) d(q[0], q[1])
    }

    function y(p) {
      var t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
    }

    function d(i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      var k = j.x + (z() * 2 - 0.25) * f,
        n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      x.setLineWidth(.1)
      r -= u / -50
      let color = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      console.log(color)
      x.setFillStyle('#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16))
      x.fill()
      context.stroke();
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }


    i();

    wx.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    })
  },
  onUnload: function () {
    clearInterval(this.interval)
  },
  changeBg: function () {
    console.log("被点击了")
  }

})