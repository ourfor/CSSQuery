<p align=center><em>基于<code>微信云开发</code>开发的<code>查询工具</code></em></div>

## 开发理由
1. 诸如金山词霸的查询软件 体积大，占用内存多 耗电 自启动 广告,有多少我们只用一次，有多少我们只需要使用它的一个小的功能,这些软件会产生大量的缓存文件
2. Linux学习过程中有不太记得的命令会使用manual手册查询，即man命令，于是就想开发出一个查询css属性，html语法，java包api的小程序
3. 为学习提供方便
4. 微信是一个好交流的平台，有不懂的东西可以讨论交流


> 也并非所有的程序都适合使用小程序开发，例如阅读软件，轻办公软件

<table>
  <tr>
    <td>
      <img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2f8pnteqoj30u01hcags.jpg">
    </td>
    <td>
      <img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2f8pyqihaj30u01hcdl5.jpg">
    </td>
    <td>
      <img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2f8c9a16wj30u01hcwlo.jpg">
    </td>
    <td>
      <img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2f890u573j30u01hc77l.jpg">
    </td>
  </tr>
</table>
  



## 主要功能

- 提供查询服务，具体可查询的内容取决于我们的数据库，只要我们的数据库足够丰富，可查询的内容就很多
- 添加评论功能，根据用户评论反馈优化程序
- 支持多种编程语言代码高亮
- 可根据用户使用评星动态优先搜索热点数据
- 页面整洁，ui美观统一
- 可拓展性强👍，代码可重用性高
- 体积小，使用NoSQL数据库，查询效率高
- 模糊查询，减少输入，尽量让用户做选择，而不是完整输入

> 考虑到用户的微信使用时长和使用微信的目的性，很多功能暂时不打算加入。

基本结构

![CSSQuery_detail](https://user-images.githubusercontent.com/33711476/57830158-d9fc8f80-77e3-11e9-8ef2-c9474771cb91.png)

## 界面演示

<table>
  <tr>
    <td><img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2f9axvw3gj30u01hck0g.jpg"></td>
    <td><img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2ev2b0sx0j30u01hcn2c.jpg"></td>
  </tr>
</table>

## 涉及技术平台
- [LeanCloud](https://leancloud.cn)
使用LeanCloud提供的免费服务应用来存储用户评论，页面访问次数，LeanCloud提供的接口对` Count `(存放页面访问次数)表的数据进行获取，再通过自己的服务器对热门搜索🔍进行定时整理，整理完毕后自动更新微信云开发的数据库中的` HotSearch `表，从而达到热门搜索推荐的效果


## 如何扩充数据库

![](https://ws1.sinaimg.cn/large/005GQrpLgy1g2f97noa1dj32bi1qw4mz.jpg)
使用java爬取特定网页，同时将爬取的数据实例化一个` JavaBean `对象，内容爬取完毕后，序列化到硬盘，再导入到我们的云开发数据库

可以尝试爬取Sun的java包的api文档，html5的语法文档等等。



***Java爬虫源码***、***JavaBeans*** 结构,详见[#7](https://github.com/ourfor/CSSQuery/issues/7)



## 关于数据库

在这个项目中，我们一共使用了3个数据库，之所以使用这么多数据库是有原因的，` 微信云开发数据库 `负责存放客户端查询的主要内容,数据库类型类似` Mongodb `,
而存储评论则是用到了` leanCloud `提供的免费数据库，这两个数据库的服务器都在境内，并且都是免费的，优点就是访问速度快不用备案，而缺点就是免费版本有限制，控制权限比较低，所以我们另外使用了一个自己的境外服务器，这个服务器复制定期获取` leanCloud `上面存储的页面访问量，同时将导出的json文件在` sql serve `中进行分析(见[#6](https://github.com/ourfor/CSSQuery/issues/6))，分析完毕后将热点数据更新到` 微信云开发 `提供的数据库中

<img width="1810" alt="Xnip2019-05-15_13-44-21" src="https://user-images.githubusercontent.com/33711476/57751250-a94f2400-7717-11e9-8349-a01623f06265.png">


 
## Credit

| <img src="https://avatars2.githubusercontent.com/u/33711476?v=4" alt="ourfor" width="100px" height="100px"/> |<img src="https://avatars2.githubusercontent.com/u/44439053?v=4" alt="ourEmpire" width="100px" height="100px"/> |
| :----: |:----: |
| [ourfor](https://github.com/ourfor) |[ourEmpire](https://github.com/ourEmpire) |

### 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [wemark](https://github.com/TooBug/wemark)
- [WxComment](https://github.com/yicm/WxComment)
- [iview-weapp](https://github.com/TalkingData/iview-weapp)


### 体验

<img src="https://file.ourfor.top/tools/css.png" width="400px">

