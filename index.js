/*
 * author by denghailong.
 * merge files.
 * node merge.js a.js b.js c.js output.js
 */

var fs = require('fs');

function merge(list, output) {
	list.forEach(function(file) {
		var content = fs.readFileSync(file, 'utf-8');
		// fs.appendFileSync(output, '\r\n/*' + file + '*/\r\n');
		fs.appendFileSync(output, content);
	});
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
	minifier: minifier
};