#!/usr/bin/env node


var Liftoff = require('liftoff');
var fs = require('fs'),
	path = require('path');

var cli = new Liftoff({
	name: 'fast-merge',
	processTitle: 'fast-merge',
	moduleName: 'fast-merge',
	// only js supported!
	extensions: {
		'.js': null
	}
});


cli.launch({}, function(env) {
	var fastMerge;
	if (!env.modulePath) {
		fastMerge = require('../');
	} else {
		fastMerge = require(env.modulePath);

	}

	function getJSON() {
		var jsonPath = path.dirname(__dirname) + '/package.json';
		if (fs.existsSync(jsonPath)) {
			var content = fs.readFileSync(jsonPath);
			content = JSON.parse(content);
			return content;
		}
		return {};
	}

	function index() {
		var slice = Array.prototype.slice,
			params = process.argv[2] || '',
			args = slice.call(process.argv, 3),
			output = args.splice(args.length - 1, 1)[0];

		var packageJson = getJSON();
		if (output) {
			fastMerge.unLinkFile(output);
			fastMerge.merge(args, output);
		}

		params = params.toLowerCase();
		if (params.indexOf('-m') > -1) {
			output && fastMerge.minifier(output);
		} else if (params.indexOf('-v') > -1) {
			console.log(packageJson.version);
		} else if (params === '' || params.indexOf('-h') > -1) {
			console.log('\r\n');
			console.log('=======================================================');
			console.log('fast-merge 是一个快速合并、压缩文件的命令项');
			console.log('使用方式：');
			console.log('fm -m input1.js input2.js input3.js output.js');
			console.log('=======================================================');
			console.log('\r\n');
		}
	}

	index();
});