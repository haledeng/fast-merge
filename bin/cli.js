var fastMerge = require('../index.js');

function index() {
	var slice = Array.prototype.slice,
		params = process.argv[2],
		args = slice.call(process.argv, 3),
		output = args.splice(args.length - 1, 1)[0];

	fastMerge.unLinkFile(output);
	fastMerge.merge(args, output);
	if (params.indexOf('-') > -1) {
		if (params.toLowerCase().indexOf('m') > -1) {
			fastMerge.minifier(output);
		}
	}
}

index();