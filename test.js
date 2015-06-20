'use strict';
var test = require('ava');
var processExists = require('process-exists');
var noopProcess = require('./');

test('noopProcess()', function (t) {
	t.plan(3);

	// for test2.js
	noopProcess({
		title: 'noop-process-2',
		persistent: true
	});

	var pid = noopProcess({title: 'noop-process-1'});

	t.assert(typeof pid === 'number');

	processExists(pid, function (err, exists) {
		t.assert(!err, err);
		t.assert(exists);
	});
});
