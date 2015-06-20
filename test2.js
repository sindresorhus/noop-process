'use strict';
var test = require('ava');
var psList = require('ps-list');

test('persistent option', function (t) {
	t.plan(3);

	psList(function (err, list) {
		t.assert(!err, err);

		t.assert(!list.some(function (x) {
			return x.name === 'noop-process-1';
		}));

		t.assert(list.some(function (x) {
			return x.name === 'noop-process-2';
		}));
	});
});
