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

module.exports = function (opts) {
	opts = opts || {};

	var title = opts.title ? 'process.title = \'' + opts.title + '\';' : '';
	var code = title + 'setInterval(function () {}, 1000 * 1000);';

	var cp = childProcess.spawn('node', ['-e', code], {
		detached: true,
		stdio: 'ignore'
	});

	cp.unref();

	if (!opts.persistent) {
		exitPids.push(cp.pid);
	}

	cleanupPids.push(cp.pid);

	return cp.pid;
};

module.exports.cleanup = function () {
	killAll(cleanupPids);
};
