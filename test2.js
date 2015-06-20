'use strict';
var test = require('ava');
var processExists = require('process-exists');
var fkill = require('fkill');

test('persistent option', function (t) {
	t.plan(5);

	processExists('noop-process-1', function (err, exists) {
		t.assert(!err, err);
		t.assert(!exists);
	});

	processExists('noop-process-2', function (err, exists) {
		t.assert(!err, err);
		t.assert(exists);

		fkill('noop-process-2', function (err) {
			t.assert(!err, err);
		});
	});
});
