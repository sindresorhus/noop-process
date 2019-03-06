'use strict';
const childProcess = require('child_process');

const cleanupPids = new Set();
const exitPids = new Set();

function killAll(pids) {
	for (const pid of pids) {
		try {
			process.kill(pid, 'SIGKILL');
		} catch (error) {}
	}
}

process.on('exit', () => {
	killAll(exitPids);
});

module.exports = opts => {
	opts = opts || {};

	if (opts.title && opts.title.length > 15) {
		return Promise.reject(new Error('The title can be maximum 15 characters'));
	}

	const title = opts.title ? `process.title = '${opts.title}';` : '';
	const forceKill = opts.onlyForceKillable ? `
		process.on('SIGTERM', () => {console.log('I can only be killed by the force!!')});
		process.on('SIGINT', () => {console.log('I can only be killed by the force!!')});
		` : '';
	const code = `${title} ${forceKill} setInterval(() => {}, 1000 * 1000);console.log('ok');`;

	return new Promise((resolve, reject) => {
		const cp = childProcess.spawn('node', ['-e', code], {
			detached: true
		});

		cp.on('error', reject);
		cp.stdout.setEncoding('utf8');

		cp.stdout.on('data', data => {
			if (data.trim() === 'ok') {
				cp.stdio = ['ignore', 'ignore', 'ignore'];
				resolve(cp.pid);
			}
		});

		cp.unref();

		if (!opts.persistent) {
			exitPids.add(cp.pid);
		}

		cleanupPids.add(cp.pid);
	});
};

module.exports.cleanup = () => {
	killAll(cleanupPids);
};
