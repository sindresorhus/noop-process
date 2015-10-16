'use strict';
var test = require('ava');
var processExists = require('process-exists');
var fkill = require('fkill');
var pify = require('pify');
var processExistsP = pify(processExists);

test('persistent option', function (t) {
	t.plan(3);

	processExistsP('noop-process-1').then(function (exists) {
		t.assert(!exists);
	});

	processExistsP('noop-process-2').then(function (exists) {
		t.assert(exists);

		pify(fkill)('noop-process-2').then(function () {
			t.assert(true);
		});
	});
});
