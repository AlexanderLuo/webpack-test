# 一些关于webpack用法的笔记

## "!"代表的意义
>代表了加载器的流式调用,例如：
>`{test : /\.css|less$/, loader : "!style!css!less"}`就代表了先使用`less`加载器来解释`less`文件，然后使用`css`加载器来解析`less`解析后的文件，依次类推

## 请求参数
>表示需要传入loader的参数(多半表示限制条件)，例如：
>`{test : /\.png$/, loader : 'url-loader?mimetype=image/png'}`
