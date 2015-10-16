'use strict';
var test = require('ava');
var processExists = require('process-exists');
var pify = require('pify');
var noopProcess = require('./');

test('noopProcess()', function (t) {
	t.plan(2);

	// for test2.js
	noopProcess({
		title: 'noop-process-2',
		persistent: true
	});

	noopProcess({title: 'noop-process-1'}).then(function (pid) {
		t.assert(typeof pid === 'number');

		pify(processExists)(pid).then(function (exists) {
			t.assert(exists);
		});
	});
});
