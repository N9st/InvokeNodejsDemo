# InvokeNodejsDemo
��ʾ���ͨ��C#ִ��Nodejs����

## ����ǰ��
1.��װNodejs��[���ص�ַ](https://nodejs.org/en "���ص�ַ")

2.��װJering.Javascript.NodeJS������ͨ��VS2022��Nuget����������װ

3.[Jering.Javascript.NodeJS](https://github.com/JeringTech/Javascript.NodeJS "Jering.Javascript.NodeJS")��ϸʹ�÷�������ǰ��Github�鿴

## ʾ���������
1.KuWoSearch.js���Ҵӿ���������ҳ�˿������ļ��ܴ��룬���ܲ����ǡ�reqId�������ܴ���������С���ָĶ���ɾ������������������룬Nodejsͨ�����´����֪C#Ҫִ��ʲô����
```javascript
module.exports = async() => {
	return reqId();
}
```

2.C#ͨ�����´�����ִ��Nodejs
```csharp
await StaticNodeJSService.InvokeFromStringAsync<string>(SearchJs)
```

3.��get�ķ�ʽ���ʿ������ֵ�����url������ͷ��ҪЯ��Referer��csrf��User-Agent

4.���ʿ������ֵ���ҳ������ӦͷSet-Cookie�п��Ի��csrf����kw_token��

## ���
��������ڽ���ѧϰ���������ڷǷ���;