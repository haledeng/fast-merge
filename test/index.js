var chai = require('chai'),
	fs = require('fs'),
	expect = chai.expect,
	index = require('../index');


describe('merge function', function() {
	it('merge file success', function() {
		index.merge(['test/a.js', 'test/b.js'], 'test/output.js');
		expect(fs.existsSync('test/output.js')).to.equal(true);
	});
});


describe('unLinkFile function', function() {
	it('delete file success', function() {
		index.unLinkFile('test/output.js');
<<<<<<< HEAD
<<<<<<< HEAD
=======
		expect(fs.existsSync('test/output.js')).to.equal(false);
>>>>>>> test
=======
		expect(fs.existsSync('test/output.js')).to.equal(false);
>>>>>>> 78c0aeb06c337800e6ec758eaa2c14606a83ceed
	});
});
