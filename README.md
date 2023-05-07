# InvokeNodejsDemo
演示如何通过C#执行Nodejs代码

## 运行前提
1.安装Nodejs，[下载地址](https://nodejs.org/en "下载地址")

2.安装Jering.Javascript.NodeJS，可以通过VS2022的Nuget包管理器安装

3.[Jering.Javascript.NodeJS](https://github.com/JeringTech/Javascript.NodeJS "Jering.Javascript.NodeJS")详细使用方法可以前往Github查看

## 示例代码介绍
1.KuWoSearch.js是我从酷我音乐网页端扣下来的加密代码，加密参数是“reqId”，加密代码我做了小部分改动和删减，尽量减少冗余代码，Nodejs通过以下代码告知C#要执行什么代码
```javascript
//mmm is a Buffer(16)
module.exports = async(mmm) => {
    mmm = Buffer.from(mmm, "base64")
    return reqId(mmm);
}
```

2.C#通过以下代码来执行Nodejs
```csharp
await StaticNodeJSService.InvokeFromStringAsync<string>(SearchJs, args: new object[] { ByteArray })
```

3.以get的方式访问酷我音乐的搜索url，请求头需要携带Referer、csrf和User-Agent

4.访问酷我音乐的主页，从响应头Set-Cookie中可以获得csrf（即kw_token）

## 最后
代码仅用于交流学习，请勿用于非法用途