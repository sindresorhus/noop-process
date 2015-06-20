'use strict';
var test = require('ava');
var psList = require('ps-list');
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

	psList(function (err, list) {
		t.assert(!err, err);

		t.assert(list.some(function (x) {
			return x.pid === pid;
		}));
	});
});
