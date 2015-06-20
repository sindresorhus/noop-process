'use strict';
var test = require('ava');
var processExists = require('process-exists');

test('persistent option', function (t) {
	t.plan(4);

	processExists('noop-process-1', function (err, exists) {
		t.assert(!err, err);
		t.assert(!exists);
	});

	processExists('noop-process-2', function (err, exists) {
		t.assert(!err, err);
		t.assert(exists);
	});
});
