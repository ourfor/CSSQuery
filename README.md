<p align=center><em>基于<code>微信云</code>开发的<code>查询工具</code></em></div>

# 主要功能

- 提供查询服务，具体可查询的内容取决于我们的数据库，只要我们的数据库足够丰富，可查询的内容就很多
- 添加评论功能，根据用户评论反馈优化程序
- 支持多种编程语言代码高亮
- 可根据用户使用评星动态优先搜索热点数据
- 页面整洁，ui美观统一
- 可拓展性强👍，代码可重用性高
- 体积小，使用NoSQL数据库，查询效率高

# 界面演示

<table>
  <tr>
    <td><img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2ev1zbpksj30u01hck0g.jpg"></td>
    <td><img src="https://ws1.sinaimg.cn/large/005GQrpLgy1g2ev2b0sx0j30u01hcn2c.jpg"></td>
  </tr>
</table>

# 如何扩充数据库

![](https://ws1.sinaimg.cn/large/005GQrpLgy1g2evn8zc29j32bi1qw4mz.jpg)
使用java爬取特定网页，同时将爬取的数据实例化一个` JavaBean `对象，内容爬取完毕后，序列化到硬盘，再导入到我们的云开发数据库

可以尝试爬取Sun的java包的api文档，html5的语法文档等等。

# Credit

| <img src="https://avatars2.githubusercontent.com/u/33711476?v=4" alt="ourfor" width="100px" height="100px"/> |<img src="https://avatars2.githubusercontent.com/u/44439053?v=4" alt="ourEmpire" width="100px" height="100px"/> |
| :----: |:----: |
| [ourfor](https://github.com/ourfor) |[ourEmpire](https://github.com/ourEmpire) |

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [wemark](https://github.com/TooBug/wemark)
- [WxComment](https://github.com/yicm/WxComment)
- [iview-weapp](https://github.com/TalkingData/iview-weapp)

