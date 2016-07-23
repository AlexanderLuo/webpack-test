webpackJsonp([3],{

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);

	console.log('chunk2');

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./chunk2.css", function() {
				var newContent = require("!!./../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./chunk2.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#container {\r\n    background-color: aquamarine;\r\n}", ""]);

	// exports


/***/ }

});