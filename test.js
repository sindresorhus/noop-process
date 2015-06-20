'use strict';
var test = require('ava');
var processExists = require('process-exists');
var noopProcess = require('./');

test('noopProcess()', function (t) {
	t.plan(4);

	// for test2.js
	noopProcess({
		title: 'noop-process-2',
		persistent: true
	});

	noopProcess({title: 'noop-process-1'}, function (err, pid) {
		t.assert(!err, err);
		t.assert(typeof pid === 'number');

		processExists(pid, function (err, exists) {
			t.assert(!err, err);
			t.assert(exists);
		});
	});
});
