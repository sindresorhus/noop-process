'use strict';
var childProcess = require('child_process');
var cleanupPids = [];
var exitPids = [];

function killAll(pids) {
	pids.forEach(function (pid) {
		try {
			process.kill(pid, 'SIGKILL');
		} catch (err) {}
	});
}

process.on('exit', function () {
	killAll(exitPids);
});

module.exports = function (opts, cb) {
	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	cb = cb || function () {};

	if (opts.title && opts.title.length > 15) {
		throw new Error('The title can be maximum 15 characters');
	}

	var title = opts.title ? 'process.title = \'' + opts.title + '\';' : '';
	var code = title + 'setInterval(function () {}, 1000 * 1000);console.log(\'ok\');';

	var cp = childProcess.spawn('node', ['-e', code], {
		detached: true
	});

	cp.on('error', cb);
	cp.stdout.setEncoding('utf8');

	cp.stdout.on('data', function (data) {
		if (data.trim() === 'ok') {
			cp.stdio = ['ignore', 'ignore', 'ignore'];
			cb(null, cp.pid);
		}
	});

	cp.unref();

	if (!opts.persistent) {
		exitPids.push(cp.pid);
	}

	cleanupPids.push(cp.pid);
};

module.exports.cleanup = function () {
	killAll(cleanupPids);
};
