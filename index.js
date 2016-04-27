/*
 * author by denghailong.
 * merge files.
 * node merge.js a.js b.js c.js output.js
 */

var fs = require('fs');

function merge(list, output) {
	list.forEach(function(file) {
		var content = fs.readFileSync(file, 'utf-8');
		fs.appendFileSync(output, '\r\n/*' + file + '*/\r\n');
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

function index() {
	var slice = Array.prototype.slice,
		minify = process.argv[2],
		args = slice.call(process.argv, 3),
		output = args.splice(args.length - 1, 1)[0];

	unLinkFile(output);
	merge(args, output);
	if (minify.toLowerCase() === '-m') {
		minifier(output);
	}
	
}

index();