## 1. ����

###  1.1 ʲô����webpack
> webpack is a module bundler. 
> webpack takes modules with dependencies and generates static assets representing those modules.

�򵥵ĸ������ǣ�webpack��һ��ģ�������ߣ�����ģ��֮�������ͬʱ���ɶ�Ӧģ��ľ�̬��Դ��

### 1.2 webpack������һЩʲô����
![����дͼƬ����](http://img.blog.csdn.net/20160723105504240)

ͼ���Ѿ�������ķ�Ӧ�˼�����Ϣ��

 - webpack����Ŀ�����еľ�̬�ļ�������һ��ģ��
 - ģ��֮�������һЩ�е�����
 - ��ҳ��ľ�̬��Դ����(���֮�����ɶ����̬�ļ����漰��������)

## 2. webpack��װ

- ȫ�ְ�װ(��ȫ�ֵ��ã���`webpack --config webpack.config.js`)

```javascript
npm install -g webpack
```
- ��Ŀ��װ

```javascript
npm install webpack

// �����������µ���
import webpack from "webpack";
var webpack = require("webpack");
```

���鰲װ�Ա���npm������������npm������Ϻܶ࣬����������

```javascript
// ��ʽһ
npm install xx --registry=https://registry.npm.taobao.org/

// ��ʽ��:��װ�Ա��ṩ��npm����
npm install -g cnpm
cnpm install xx

// ��ʽ��
// ���û���Ŀ¼�£��ҵ�.npmrc�ļ������������������
registry=https://registry.npm.taobao.org/
```

## 3. webpack�Ļ�������
���������ļ�(`webpack.config.js`��ִ��webpack�����ʱ��Ĭ�ϻ�ִ������ļ�)
```javascript
module.export = {
	entry : 'app.js',
	output : {
		path : 'assets/',
		filename : '[name].bundle.js'
	},
	module : {
		loaders : [
			// ʹ��babel-loader����js����jsxģ��
			{ test : /\.js|\.jsx$/, loader : 'babel' },
			// ʹ��css-loader����cssģ��
			{ test : /\.css$/, loader : 'style!css' },
			// or another way
			{ test : /\.css$/, loader : ['style', 'css'] }
		]
	}
};
```
˵��һ�� `webpack.config.js`Ĭ�����һ��`webpack`�������ļ�����`CLI`��ʽ������ͬ��ֻ�Ǹ��Ӽ��

˵������ ִ��`webpack`��������������ã��Ⱦ�������ȫ�ְ�װ`webpack`����Ŀ��װ��ģ��`loader`

˵������ `entry`��Ӧ��Ҫ��������`js`�ļ���`output`��Ӧ�����Ŀ¼�Լ��ļ�����`module`�е�`loaders`��Ӧ��������ģ��ʱ��Ҫ�ļ�����

**һ���򵥵�����**

`basic/app.js`
```javascript
require('./app.css');
document.getElementById('container').textContent = 'APP';
```

---------
`basic/app.css`
```css
* {
    margin: 0;
    padding: 0;
}
#container {
    margin: 50px auto;
    width: 50%;
    height: 200px;
    line-height: 200px;
    border-radius: 5px;
    box-shadow: 0 0 .5em #000;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
}
```

--------
`basic/webpack.config.js`
```javascript
/**
 * webpack��������ļ�
 */

module.exports = {
	// ������ж�����js,��Ҫ�����һ���ļ���,��ô�������ôд 
	// entry : ['./app1.js', './app2.js']
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    }
};
```

-----------
`basic/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>basic webpack</title>
</head>
<body>
    <div id="container"></div>
    <script src="./assets/main.bundle.js"></script>
</body>
</html>
```

��`basic`�ļ���ִ��`webpack`�������Ϣ����

![����дͼƬ����](http://img.blog.csdn.net/20160723115842221)

����`main.bundle.js`�ļ���`chunk`����Ϊ`main`��Ҳ��`webpack`Ĭ�����ɵ�`chunk`��

## 4. webapck���õ��ĸ�����
---------------

### 4.1 entry���
--------------
 **4.1.1`webpack`�Ķ��������**

�����ļ������У�ֻ��һ������ļ�����ô�����Ӧ��һ��ҳ����Ҫ���ض������ļ����߶��ҳ����ͬʱ�����Ӧ�Ĵ���ļ���ʱ��Ӧ����ô����
```javascript
entry : {
	app1 : './app1.js',
	app2 : './app2.js'
}
```
��`multi-entry`�ļ���ִ��`webpack`�������Ϣ����

![����дͼƬ����](http://img.blog.csdn.net/20160723122445540)

�ɼ���������������ļ����Լ����Զ�Ӧ��`chunk`��

----------
### 4.2 output���
------------
**4.2.1 `output.publicPath`**
```javascript
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

����һ�ι����Ļ���
> The publicPath specifies the public URL address of the output files when referenced in a browser. For loaders that embed `<script>` or `<link>` tags or reference assets like images, publicPath is used as the href or url() to the file when it��s different then their location on disk (as specified by path). 

������˼���ǣ�`publicPath`ָ�����������������ʲô��ַ��������ľ�̬�ļ�������������ͼƬ���ű��Լ���ʽ���صĵ�ַ��һ���������Ϸ����Լ�CDN�����ʱ��ʹ�á�

����������һ�����ã�
```javascript
var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].bundle.js',
        publicPath : 'http://rynxiao.com/assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename: './index-release.html',
            template: path.resolve('index.template'),
            inject: 'body'
        })
    ]
};
```
�����ҽ�`publicPath`���ó���`http://rynxiao.com/assets/`���������õ��˲����һЩ�������������ὲ������֮�����������������������߷���ʱ�����ҳ�ļ�������`script`�����õ�·�����ᱻ�滻������ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723132645470)

----------------
**4.2.2 `output.chunkFilename`**

�����ļ�������ģ�����⣬���������������⸽�ӵĿ飬������ģ���в��ô���ָ�ͻ�������������������`chunkFilename`�а������µ��ļ����ɹ���

[id] �ᱻ��Ӧ���id�滻.

[name] �ᱻ��Ӧ���name�滻�����߱�id�滻����������û��name��.

[hash] �ᱻ�ļ�hash�滻.

[chunkhash] �ᱻ���ļ�hash�滻.

���磬����output���������ã�
```javascript
output : {
    path : './assets/',
    filename : '[name].[hash].bundle.js',
    chunkFilename: "chunk/[chunkhash].chunk.js"
}
```
ͬʱ���޸���һ��`basic/app.js`�е��ļ�
```javascript
require('./app.css');

require.ensure('./main.js', function(require) {
    require('./chunk.js');
});

document.getElementById("container").textContent = "APP";
```
���ж�Ӧ��`chunk.js`�ͻ����ɴ���`chunkhash`��`chunk`�ļ�������ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723135002158)

*���������ļ���汾�ŵ�ʱ���ر����ã���ʱ��ν���`hash`�滻������ὲ��*

-----------
**4.2.3 `output.library`**

���������Ϊ�ⷢ����ʱ����õ������õ����ּ�Ϊ������֣�ͨ�����Դ���`libraryTarget`����ʹ�á������Ҹ�`basic/webpack.config.js`�������������ã�
```javascript
output : {
	// ...
	library : 'testLibrary'
	// ...
}
```
��ôʵ�������ɳ�����`main.bundle.js`�л�Ĭ�ϴ������´��룺
```javascript
var testLibrary = (//....��ǰ�Ĵ�����ɵĴ���);
// ������ֱ������������ʱ�򣬾Ϳ���ֱ��ʹ��`testLibrary`�������
```
![����дͼƬ����](http://img.blog.csdn.net/20160723142057926)

------------
**4.2.4 `output.libraryTarget`**

�涨������һ�ַ�ʽ�����Ŀ⣬���磺amd/cmd/����ֱ�ӱ����������������

`"var"` - ��ֱ�ӱ������(Ĭ��library��ʽ) `var Library = xxx (default)`

`"this"` - ͨ������`this`��������� `this["Library"] = xxx`

`"commonjs"` - ͨ������`exports`��������� `exports["Library"] = xxx`

`"commonjs2"` - ͨ������`module.exports`��������� `module.exports = xxx`

`"amd"` - ��amd��ʽ���

`"umd"` - ���commonjs2/amd/root

��������`umd`��ʽ�������ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723142325583)

-------------

### 4.3 module���
--------

#### 4.3.1 `loader`��`!`����ĺ���
> `require("!style!css!less!bootstrap/less/bootstrap.less");`
// => the file "bootstrap.less" in the folder "less" in the "bootstrap"
//    module (that is installed from github to "node_modules") is
//    transformed by the "less-loader". The result is transformed by the
//    "css-loader" and then by the "style-loader".
//    If configuration has some transforms bound to the file, they will not be applied.

�������������ʽ���ã����磺
```javascript
{ test : /\.css|\.less$/, loader : 'style!css!less' }
```
�ʹ�������ʹ��less������������less�ļ���Ȼ��ʹ��css������������less��������ļ�����������

--------
#### 4.3.2 `loaders`�е�`include`��`exclude`
`include`��ʾ����Ҫ�������ļ�����Ŀ¼����`exclude`�ı�ʾ��Ҫ�ų���Ŀ¼

����������������һ��Ҫ�ų�`node_modules`Ŀ¼���Ϳ�������д
```javascript
{ 
	test : /\.js$/, 
	loader : 'babel',
	exclude : nodeModuleDir 
}
```
�ٷ����飺���Ȳ���include������include������ļ�Ŀ¼

---------
#### 4.3.3 `module.noParse`
ʹ����`noParse`��ģ�齫���ᱻ`loaders`���������Ե�����ʹ�õĿ����̫�󣬲������в�����`require`��`define`�������ƵĹؼ��ֵ�ʱ��(��Ϊ��Щģ����ز����ᱻ���������Ծͻᱨ��)�����ǾͿ���ʹ�������������������ܡ�

������������ӣ���`basic/`Ŀ¼������`no-parse.js`
```javascript
var cheerio = require('cheerio');

module.exports = function() {
    console.log(cheerio);
}
```
`webpack.config.js`�������������ã�
```javascript
module : {
    loaders : [
        { test : /\.js$/, loader : 'babel' },
        { test : /\.css$/, loader : 'style!css' }
    ],
    noParse : /no-parse.js/
}
```
��ִ�д������������д�`index.html`ʱ���ͻᱨ��`require is not defined`

![����дͼƬ����](http://img.blog.csdn.net/20160723152744481)

### 4.4 resolve���

#### 4.4.1 `resolve.alias`
Ϊģ�����ñ������ܹ��ÿ�����ָ��һЩģ�������·������һЩ����Ҫ��import����require�Ŀ⣬��react,������ÿ���ֱ��ָ�����ǵ�λ�ã�����webpack����ʡ�²�������Ӳ�̵�ʱ�䡣
���������޸�`basic/app.js`�е�������ݣ�
```javascript
var moment = require("moment");

document.getElementById("container").textContent = moment().locale('zh-cn').format('LLLL');
```
����һ������ʱ�����⣬������ʾ��ǰ��ʱ�䡣ʹ��`webpack --profile --colors --display-modules`ִ�������ļ����õ����½����

![����дͼƬ����](http://img.blog.csdn.net/20160723162934423)

���лᷢ�֣�����ܹ�������104�������ļ�������һ���ʱ�䶼�ڴ������`moment`�����ص����飬����Ѱ��`moment`������һЩ���ȵȡ�

��`basic/webpack.config.js`�����������ã�Ȼ��ִ�������ļ�
```javascript
resolve : {
    alias : {
        moment : 'moment/min/moment-with-locales.min.js'
    }
}
```
![����дͼƬ����](http://img.blog.csdn.net/20160723163439259)

��û�з��ִ����ʱ���Ѿ���������̣�����Ҳֻ���������������ļ���

**���`module.noParse`ʹ��**

`module.noParse`�ο�����Ľ���
```javascript
noParse: [/moment-with-locales/]
```
ִ�д����Ч�����£�

![����дͼƬ����](http://img.blog.csdn.net/20160723163819826)

�ǲ��Ƿ��ִ����ʱ���һ�������ˡ�

**���`externals`ʹ��**

`externals`�ο�����Ľ���
>Webpack ����˵�ǿ���������Ľű����������ڶ��ֻ����£�Web ����ֻ����Ĭ�ϵ�һ�֣�Ҳ����õ�һ�֡����ǵ� Web ���кܶ�Ĺ��� CDN ������ô ��ô�� Webpack �͹��õ� CDN ���ʹ���أ�������ʹ�� externals ����һ���ⲿ������
```javascript
externals: {
    moment: true
}
```
��Ȼ�� HTML ��������Ҫ����һ��
```javascript
<script src="//apps.bdimg.com/libs/moment/2.8.3/moment-with-locales.min.js"></script>
```
ִ�д����Ч�����£�

![����дͼƬ����](http://img.blog.csdn.net/20160723170548257)

---------
#### 4.4.2 `resolve.extensions`

```javascript
resolve : {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".less"]
}
```
�������õ��������Զ������ļ�����չ���������������´��룺
```javascript
require('style.less');

var app = require('./app.js');
```
��ô������������֮�������д�ɣ�
```javascript
require('style');

var app = require('./app');
```
------------
### 4.5 externals

������������Ŀ��requireһЩ������������API�����ֲ�������Щ����Դ�뱻����������ʱ�ļ��У�����ʵ�ʿ����к��б�Ҫ����ʱ���ǾͿ���ͨ������externals���������������⣺
```javascript
//webpack.config.js
module.exports = {
    externals: {
      'react': 'React'
    },
    //...
}
```
externals�����key�Ǹ�requireʱ�õģ�����require('react')�������value��ʾ���������global����window���з��ʵ��ö���������window.React��

ͬ��jquery�Ļ��Ϳ�������д��'jquery': 'jQuery'����ôrequire('jquery')���ɡ�

HTML��ע������˳�򼴿ɣ�
```javascript
<script src="react.min.js" />
<script src="bundle.js" />
```

----------------------
### 4.6 devtool
�ṩ��һЩ��ʽ��ʹ�ô�����Ը��ӷ��㣬��Ϊ���֮��Ĵ����Ǻϲ��Ժ�Ĵ��룬�������Ŵ�Ͷ�λ�����������¼��ַ�ʽ���μ�����[devtool](http://webpack.github.io/docs/configuration.html#devtool)

���磬����`basic/app.js`�������������ã�
```javascript
require('./app.css');

// ����hello.js����Ȼ���ļ������ǲ������hello.js�ļ��ģ�����ᱨ��
require('./hello.js');

document.getElementById("container").textContent = "APP";
```
ִ���ļ���֮������`index.html`�����������£�

![����дͼƬ����](http://img.blog.csdn.net/20160723172740677)

��������ʾʵ��main.bundle.js��48�У����ȥ�����еı������£�

![����дͼƬ����](http://img.blog.csdn.net/20160723172852054)

����������ȫ�����������������ĸ��ط������ˣ�������������������٣���һ���ļ���������ǧ�е�ʱ���㶨λ`bug`��ʱ�佫�������

����`devtool`�ļ����ã����£�
```javascript
module.exports = {
	devtool: 'eval-source-map',
	// ....
};
```
ִ���ļ���֮������`index.html`�����������£�

![����дͼƬ����](http://img.blog.csdn.net/20160723173217887)

���﷢��ֱ�Ӷ�λ����`app.js`�����ұ������ڵڶ��г������ȥ�����еı������£�

![����дͼƬ����](http://img.blog.csdn.net/20160723173402869)

�������ⶨλһĿ��Ȼ��

## 5. webpack���ü���

### 5.1 ����黮��
------------
**5.1.1 Commonjs����`require.ensure`������`chunk`��**
```javascript
require.ensure(dependencies, callback);

//static imports
import _ from 'lodash'

// dynamic imports
require.ensure([], function(require) {
  let contacts = require('./contacts')
})
```
��һ����`output.chunkFileName`���Ѿ�������ʾ������ȥ�鿴

----------------------------
**5.1.2 AMD����`require`������`chunk`��**
```javascript
require(["module-a", "module-b"], function(a, b) {
    // ...
});
```

---------------------
**5.1.3 ����ĿAPP�����빫�����ļ��������**

������`basic/app.js`��������´���
```javascript
var $ = require('juqery'),
	_ = require('underscore');

//.....
```
Ȼ�������������ļ������`vendor`���Լ����ô������Ĳ�������ɵ�`vendor`����������
```javascript
var webpack = require("webpack");

module.exports = {
	entry: {
		app: "./app.js",
		vendor: ["jquery", "underscore", ...],
	},
	output: {
		filename: "bundle.js"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
	]
};
```
���������ļ���Ч�����£�

![����дͼƬ����](http://img.blog.csdn.net/20160723191116598)

------------------
**5.1.4 ��ȡ������ļ��Ĺ�������**

�������½���һ���ļ��н���`common`���������ļ���
```javascript
// common/app1.js

console.log("APP1");
```
```javascript
// common/app2.js

console.log("APP2");
```
���֮�����ɵ�`app1.bundle.js`��`app2.bundle.js`�л������๫�����룬���ǿ��Խ�����ȡ������
```javascript
// common/webpack.config.js

/**
 * webpack��������ļ�
 * ��ȡ��������js
 */

var webpack = require('webpack');

module.exports = {
    entry : {
        app1 : './app1.js',
        app2 : './app2.js'
    },
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin("common.js")
    ]
};
```
��ȡ���Ĺ���jsΪ`common.js`,��ͼ

![����дͼƬ����](http://img.blog.csdn.net/20160723192023883)

�鿴`app1.bundle.js`�����ִ�������ݻ�����������ģ������д�Ĵ��룬���������Ѿ��������`common.js`��ȥ��

![����дͼƬ����](http://img.blog.csdn.net/20160723192454683)

**5.1.5 ��ȡcss�ļ��������css bundle**

Ĭ���������`require('style.css')`����µ�����ʽ�ļ�����ֱ����`index.html`��`<head>`������`<style>`��ǩ��������������������뽫��Щcss�ļ���ȡ���������԰������������ȥ����
```javascript
// extract-css/app1.js
require('./app1.css');
document.getElementById("container").textContent = "APP";

// extract-css/app2.js
require('./app2.css');
document.getElementById("container").textContent = "APP1 APP2";

// extract-css/app1.css
* {
    margin: 0;
    padding: 0;
}
#container {
    margin: 50px auto;
    width: 50%;
    height: 200px;
    line-height: 200px;
    border-radius: 5px;
    box-shadow: 0 0 .5em #000;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
}

// extract-css/app2.css
#container {
    background-color: #f0f0f0;
}

// extract-css/webpack.config.js
/**
 * webpack��������ļ�
 * ��ȡ������ʽ(û��chunk)
 */

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry : {
        app1 : './app1.js',
        app2 : './app1.js'
    },
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins : [
        new ExtractTextPlugin("[name].css")
    ]
};
```
�õ���Ч������ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723193957752)

�������chunk�ļ�������chunk�ļ���Ҳ��Ϊ����ʽ�ļ�����ô��ʽ�ļ���Ƕ�뵽js��

**css�ϲ���һ���ļ�**
```javascript
// ...
module.exports = {
    // ...
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ]
}
```
Ч����ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723194749005)

�������chunk�ļ�������chunk�ļ���Ҳ��Ϊ����ʽ�ļ�����ʽ�ļ�����Ƕ�뵽js�У�����ֱ�������`style.css`

**���CommonsChunkPluginһ��ʹ��**
```javascript
// ...
module.exports = {
    // ...
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin("[name].css")
    ]
}
```
Ч��ͼ���£�

![����дͼƬ����](http://img.blog.csdn.net/20160723200356707)

-------------------
### 5.2 ��θ��ļ���汾

���Ϸ���ʱΪ�˷�ֹ��������澲̬��Դ���ı��ļ��汾�������ṩ����������

**5.2.1 ʹ��`HtmlWebpackPlugin`���**
```javascript
// version/webpack.config.js

/**
 * webpack��������ļ�
 * �ļ���汾�����Ϸ���
 */

var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].[hash].bundle.js',
        publicPath : 'http://rynxiao.com/assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename: './index-release.html',
            template: path.resolve('index.template'),
            inject: 'body'
        })
    ]
};
```
���ɵ�Ч�����£�

![����дͼƬ����](http://img.blog.csdn.net/20160723201203843)

ÿ�δ��֮�󶼻������ļ�hash�������������˰汾����

----------------
**5.2.2 �Զ��������ļ���Ӱ汾**
```javascript
// version/webpack.config.version.js

/**
 * webpack��������ļ�
 * �ļ���汾�����Ϸ������Զ�������ʽ
 */

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = {
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].[hash].bundle.js',
        publicPath : 'http://rynxiao.com/assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        function() {
            this.plugin("done", function(stats) {
                fs.writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson())
                );
                fs.readFile('./index.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                   $('script[src*=assets]').attr('src','http://rynxiao.com/assets/main.' 
		                    + stats.hash +'.bundle.js');
                    fs.writeFile('./index.html', $.html(), function(err) {
                        !err && console.log('Set has success: '+ stats.hash)
                    })
                })
            });
        }
    ]
};
```

Ч����ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723203654971)

���Դﵽͬ����Ч��������stats��ʱֻ���õ�hashֵ����Ϊ����ֻ�ܿ�����hash�����汾���ƣ��������ǿ��Խ�hashĿ¼�ȵ�

----------------
### 5.3 shim
���������³����������õ� Pen ���ģ��, ���ģ�������һ�� window.jQuery, ������ͷ�� jQuery �� CommonJS �﷨�ģ��� Pen �����������ɺ��˰���ȫ�ֵ�, ����������Ҫͨ�� require('pen') ��ȡ������ ���յ�д�������� Shim ����ֱ���ṩ֧��:

**����һ��**
```javascript
{test: require.resolve('jquery'), loader: 'expose?jQuery'}, // ���jQuery��ȫ��
{test: require.resolve('pen'), loader: 'exports?window.Pen'}    // ��Pen��Ϊһ��ģ������
```

**��������**
```javascript
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
})
```
>This plugin makes a module available as variable in every module. 
>The module is required only if you use the variable.
>Example: Make $ and jQuery available in every module without writing require("jquery").

--------------------
### 5.4 ����дһ��loader

> Loader ��֧����ʽִ�еģ��紦�� sass �ļ��� loader�������� sass-loader��css-loader��style-loader ��ɣ��� compiler ������������ִ�У���һ�� Loader �����õ��账���ԭ���ݣ���һ�� Loader �����Ľ���ش�����һ�����Ŵ������� Loader �������Ľ���� String �� Buffer ����ʽ���ظ� compiler����ȻҲ��ϣ��ÿ�� loader **ֻ���������£��������**������ϣ��һ���Ĺ��ܶ����ɵ�һ�� Loader �С�

��������������д����

```javascript
// Identity loader
module.exports = function(source) {
  return source;
};
```

```javascript
// Identity loader with SourceMap support
module.exports = function(source, map) {
  this.callback(null, source, map);
};
```
��һ��Ϊ������д��������`return`���أ� ����Ϊ��ͬ����� Loader �ҷ��ص�����Ψһ�������дloader�������Ļ���ͬ������Ҳ������ͷ���������ã����磺
```javascript
// Module dependencies.
var fs = require("fs");
module.exports = function(source) {
  return source;
};
```
���ڶ�������ϣ�����`loader`֮����ʽ���ã�����һ��`loader`���صĽ�����ݸ���һ��`loader`��

**����**

�������뿪��һ��es6-loader,ר����������`.es6`�ļ�����β���ļ�������ô���ǿ�����ôд
```javascript
// loader/es6-loader.js
// ��Ȼ��������ﲻ�뽫���loader�����صĶ������ݸ���һ��laoder����ô��
// ���������ֱ�ӷ���return source
// ����ı�֮����ֱ�ӿ����Ӹ�babel-loader���д���
module.exports = function(source, map) {
	// ����es6��β�ļ�������source�ı�
    source = "console.log('I changed in loader');"
    // ��ӡ���ݽ����Ĳ���
    console.log("param", this.query);
    // ... ���ǻ�������һЩ�������߼�����
    this.callback(null, source, map);
};

// loader/loader1.es6
let a = 1;
console.log(a);

// loader/app.js
// ��loader�д��ݲ���
require('./es6-loader?param1=p1!./loader1.es6');
document.getElementById("container").textContent = "APP";
```
ִ��webpack�������ڿ���̨���ӡ��param��ֵ����ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723221900665)

��ִ�����֮�󣬴�`index.html`���ڿ���̨��ӡ����I changed in loader����������1

![����дͼƬ����](http://img.blog.csdn.net/20160723222056334)

**����**

����ȥ�Ķ�������ƪ���� [��ο���һ�� Webpack loader](http://web.jobbole.com/84851/)

--------------------
### 5.4 ����дһ��plugin

��������Ľṹ

����ǿ���ʵ�����Ķ���������prototype�ϱ����һ��`apply`����������������ڲ����װ��ʱ��`Webpack compiler`���е��á�

```javascript
function HelloWorldPlugin(options) {
	// Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
	compiler.plugin('done', function() {
	    console.log('Hello World!'); 
	});
};

module.exports = HelloWorldPlugin;
```

��װһ�������������ӵ������е�`plugins`�����С�

```javascript
var HelloWorldPlugin = require('hello-world');

var webpackConfig = {
// ... config settings here ...
	plugins: [
		new HelloWorldPlugin({options: true})
	]
};
```
ִ��Ч����ͼ��

![����дͼƬ����](http://img.blog.csdn.net/20160723223746845)

����ֻ���򵥵����룬ƽ��һ�㶼����Ҫ�Լ�д�����������һ���˽⣬����ȥ����������

### 5.5 ����һ�����ط�����
```javascript
// 1.ȫ�ְ�װwebpack-dev-server
cnpm install -g webpack-dev-server

// 2. ����һ���ļ�����Ŀ¼������
webpack-dev-server --content-base basic/

// 3. �����������localhost:8080
```

------------------
### 5.6 ���滻
```javascript
// auto-refresh/app.js
document.getElementById("container").textContent = "APP APP HOT ";
console.log("OK");

// auto-refresh/server.js
var webpack = require('webpack');
var config = require('./webpack.config.js');
var WebpackDevServer = require("webpack-dev-server");

var compiler = webpack(config);
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});

// auto-refresh/webpack.config.js
/**
 * webpack��������ļ�
 */

var webpack = require('webpack');

module.exports = {
    entry : [
        'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './app.js'
    ],
    output : {
        path : './assets/',
        filename : '[name].bundle.js',
        publicPath : './assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'react-hot!babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
    ]
};

// auto-refresh/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>basic webpack</title>
</head>
<body>
    <div id="container"></div>
    <script src="./assets/main.bundle.js"></script>
</body>
</html>

// ����
node server.js

// ��������룺localhost:8080
```

----------------------------
### 5.7 ��wepack.config.js֧��es6д��
```javascript
// 1. ��װbabel-core��babel-preset-es2015�Լ�babel-loader

// 2. ��Ŀ��Ŀ¼������.babelrc�ļ�
{
  "presets": ["es2015"]
}

// 3. ��webpack.config.js��������Ϊwebpack.config.babel.js

// 4.����webpack --config webpack.config.babel.js

// ˵��node �汾5.0���ϣ�babel-core�汾6������Ҫ�������
```
>����һ�� Webpack ֧�֣����ĵ�����ȫû���ᵽ������  ��Ӧ�����Ͼͻ���ϣ���ֻҪ��������ļ������� webpack.config.[loader].js ��Webpack �ͻ�����Ӧ�� loader ȥת��һ�������ļ�������Ҫʹ���������������Ҫ��װ babel-loader �� babel-core ����������ס�㲻��Ҫ������ babel ����

**�����취(δ�ɹ�)**

```javascript
1.�������ķ����У���ʵ����Ҫ���������Ϳ���ֱ������webpack�����ǽ�������һֱ���ɹ�
2.{ 
	test : /\.js|jsx$/, 
	loader : 'babel',
	query: {
          //�������presents ʹ��������presets����js����jsx�ļ�
          presets: ['es2015', 'react']
    } 
}
```


## 6.�������
[webpack�ٷ���վ](http://webpack.github.io/docs/)

[�� ES6 ��д Webpack �������ļ�](http://cnodejs.org/topic/56346ee43ef9ce60493b0c96)

[һСʱ���̻� ���� webpack ����ָ��](http://www.cnblogs.com/vajoy/p/4650467.html)

[Webpackɵ��ʽָ�ϣ�һ��](https://zhuanlan.zhihu.com/p/20367175)

[ǰ��ģ�黯����-webpack](http://www.cnblogs.com/Leo_wl/p/4862714.html)

[��ο���һ�� Webpack Loader ( һ )](http://web.jobbole.com/84851/)

[����externals����](https://segmentfault.com/q/1010000002720840)

[webpackʹ���Ż�](http://www.open-open.com/lib/view/open1452487103323.html)

[http://webpack.github.io/docs/installation.html](http://webpack.github.io/docs/installation.html)

[https://github.com/petehunt/webpack-howto](https://github.com/petehunt/webpack-howto)







