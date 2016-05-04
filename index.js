/*
 * author by denghailong.
 * merge files.
 * node merge.js a.js b.js c.js output.js
 */

var fs = require('fs'),
	path = require('path');

function merge(list, output) {
	list.forEach(function(file) {
		var content = fs.readFileSync(file, 'utf-8');
		var dirname = path.dirname(output);
		if (!fs.existsSync(dirname)) {
			mkdir(dirname);
		}
		fs.appendFileSync(output, content);
	});
}


function mkdir(dir) {
	if (fs.existsSync(dir)) return;
	var dirname = path.dirname(dir);
	if (!fs.existsSync(dirname)) {
		argument.callee(dirname);
	} 
	fs.mkdirSync(dir);
}


function minifier(output) {
	var minify = require('minifier');
	minify.minify(output, {
		output: output
	});
}


function unLinkFile(file) {
	if (fs.existsSync(file)) {
		fs.unlinkSync(file);
	}
}

module.exports = {
	unLinkFile: unLinkFile,
	merge: merge,
	minifier: minifier,
	mkdir: mkdir
};