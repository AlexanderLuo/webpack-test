# 一些关于webpack用法的笔记

## 基本用法
<http://webpack.github.io/docs/installation.html>

<https://github.com/petehunt/webpack-howto>

## 贴几篇文章
[关于externals解释](https://segmentfault.com/q/1010000002720840)

[webpack使用优化](http://www.open-open.com/lib/view/open1452487103323.html)

## 基本的配置文件

```javascript
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```

## 1. "!"代表的意义
代表了加载器的流式调用,例如：

`{test : /\.css|less$/, loader : "!style!css!less"}`

就代表了先使用`less`加载器来解释`less`文件，然后使用`css`加载器来解析`less`解析后的文件，依次类推

>```javascript
require("!style!css!less!bootstrap/less/bootstrap.less");
// => the file "bootstrap.less" in the folder "less" in the "bootstrap"
//    module (that is installed from github to "node_modules") is
//    transformed by the "less-loader". The result is transformed by the
//    "css-loader" and then by the "style-loader".
//    If configuration has some transforms bound to the file, they will not be applied.
```

## 2. 请求参数
表示需要传入loader的参数(多半表示限制条件)，例如：

`{test : /\.png$/, loader : 'url-loader?mimetype=image/png'}`

## 3. 关于code-splitting
* 采用`require.ensure`方式划分文件块

>`require.ensure(dependencies, callback)`
>The require.ensure method ensures that every dependency in dependencies can be synchronously required when calling the callback. callback is called with the require function as parameter.
>`require.ensure` only loads the modules, it doesn’t evaluate them.

ensure 使得我们可在所有的dependencies项加载完毕后，再执行回调 。ensure仅仅是加载组件，并不会执行，若要执行，需要借助传进去的require参数。

本地三个模块a,b,c，各在模块中暴露一个全局变量
```javascript
var a = require("./a");
require.ensure(["./b"], function(require) {
    var c = require("./c");
});
```
编译之后发现：生成了两个块文件，ensure方式加载的文件模块被单独划分为一个块
![ensure](./code-spliting/ensure.png)

打开chrome控制台,输入window.a,以及window.c会得到值,而window.b会显示undefine

* 采用CommonsChunkPlugin插件进行按需划分

## 4. Shim
在某些情况下，如果一个文件中存在一些不被支持的模块格式或者根本就不能称作为模块的格式，那么webpack并不能完好的解析它。这时就要借助一些方法
使得这样的文件成为一个能够被webpack解析的模块

**import-loader**

>This loader allows you to put some modules or arbitrary JavaScript onto a local variable of the file.

>这个加载器允许你将一些模块或者任意的javascript代码赋值到一个本地变量上

比如有如下场景：我们用到 Pen 这个模块, 这个模块对依赖一个 window.jQuery, 可我手头的 jQuery 是 CommonJS 语法的，而 Pen 对象又是生成好了绑在全局的, 可是我又需要通过 require('pen') 获取变量。 最终的写法就是做 Shim 处理直接提供支持:

```javascript
{test: require.resolve('jquery'), loader: 'expose?jQuery'}, // 输出jQuery到全局
{test: require.resolve('pen'), loader: 'exports?window.Pen'}    // 将Pen作为一个模块引入
```

**plugin `ProvidePlugin`**

>This plugin makes a module available as variable in every module. The module is required only if you use the variable.

>Example: Make $ and jQuery available in every module without writing require("jquery").

>```javascript
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
})
```

参考文档：[官网中关于webpack shim的讲解](http://webpack.github.io/docs/shimming-modules.html)

<https://github.com/webpack/docs/wiki/shimming-modules>

## 5. 关于output中的publicPath
代表了线上发布的目录，通常是CDN替换
```javascript
output: {
    path: "/home/proj/public/assets",
    publicPath: "/assets/"
}
```

## 6. long-term-caching
参照[官网](http://webpack.github.io/docs/long-term-caching.html),为编译文件生成hash值,然后在自定义插件中动态替换脚本引用
```javascript
// config
{
    output: {
        path: path.join(__dirname, "assets", "[hash]"),
        publicPath: "assets/[hash]/",                       // 线上发布目录
        filename: "output.[hash].bundle.js",                // 编译生成hash文件名
        chunkFilename: "[id].[hash].bundle.js"              // 块文件hash
    }
}

// generate json File && replace html reference
plugins: [
  function() {
    this.plugin("done", function(stats) {
        fs.writeFileSync(
            path.join(__dirname, "stats.json"),
            JSON.stringify(stats.toJson())
        );
        fs.readFile('./index.html', function(err, data) {
            var $ = cheerio.load(data.toString());
            $('script[src*=assert]').attr('src', './assert/'+ stats.hash +'/output.'+ stats.hash +'.bundle.js');
            fs.writeFile('./index.html', $.html(), function(err) {
                !err && console.log('Set has success: '+ stats.hash)
            })
        })
    });
  }
]

```

## 7. stylesheets(关于独立出css文件的用法)
官网已经讲解得很清楚 <http://webpack.github.io/docs/stylesheets.html>

* with plugin 'extract-text-webpack-plugin'

`npm install extract-text-webpack-plugin --save-dev`

```javascript
// loaders
module: {
    loaders: [
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
    ]
},

// plugins
plugins: [
    new ExtractTextPlugin("[name].css")
]

// all style will be commited to the [name].css (the name is what your entry has been setted)

// all styles in separate css output file with the config
// new ExtractTextPlugin("style.css", {allChunks: true})
// so the chunk files don't contain the embedded styles
```

* styles in commons chunk

>You can use a separate css file in combination with the CommonsChunkPlugin. In this case a css file for the commons chunk is emitted too.

```javascript
plugins: [
    new webpack.optimize.CommonsChunkPlugin(/*name:*/"commons", /*chunks:*/"commons.js"),
    new ExtractTextPlugin("[name].css")
]
```

### Tips
* 配合CommonsChunkPlugin插件使用,会提出公共的js文件以及公共的css文件
* 如果编译出错,不妨升级一下全局webpack试试,我当时的1.12.2的版本一直报错，升级之后就可以了

## 8. resolve
* extensions(可以在文件中直接引用需要加载的文件 without suffix)

```javascript
resolve: {
    extensions: ['', '.js', '.es6']
},
```
* alias

resolve里面有一个alias的配置项目，能够让开发者指定一些模块的引用路径。对一些经常要被import或者require的库，如react,我们最好可以直接指定它们的位置，这样webpack可以省下不少搜索硬盘的时间。

![alias](./library&&externals/alias.png)

## 9. 一些插件
- 压缩

>To minimize your scripts (and your css, if you use the css-loader) webpack supports a simple option:

>`new webpack.optimize.UglifyJsPlugin()`

- 合并比较小的块文件，减少request请求

>While writing your code, you may have already added many code split points to load stuff on demand. After compiling you might notice that there are too many chunks that are too small - creating larger HTTP overhead. Luckily, Webpack can post-process your chunks by merging them. You can provide two options:

>Limit the maximum chunk count with `new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})`

>//限制最大的文件块数量

>Limit the minimum chunk size with `new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})`

> //限制每一个文件块的最小占用空间

## 10. library && externals
`output.libraryTarget` 指定输出的类型,指定可以在文件中以何种方式使用(CommonJs, AMD, var Or UMD)

`output.library` 指定输出库的名字

`externals` 如果一些库不想被打包到bundle中，而又必须被依赖，那么就可以使用这个参数，同时在页面中使用`<script>`标签

externals对象的key是给require时用的，比如require('react')，对象的value表示的是如何在global（即window）中访问到该对象。

同理jquery的话就可以这样写：'jquery': 'jQuery'，那么require('jquery')即可。

## 11.上线的一些配置文件(可另外写一个配置文件，例如:webpack.pro.config.js 调用：webpack --config webpack.pro.config.js)
- 压缩Javascript

`new webpack.optimize.UglifyJsPlugin()`

`new webpack.optimize.MinChunkSizePlugin(minSize)`

- 压缩React

```javascript
new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})
```
- CDN替换

设置output.PublicPath即可

- 抽取公共CSS、JS文件

参看第7点
