'use strict';
const childProcess = require('child_process');

const cleanupPids = new Set();
const exitPids = new Set();

const killAll = pids => {
	for (const pid of pids) {
		try {
			process.kill(pid, 'SIGKILL');
		} catch (_) {}
	}
};

process.on('exit', () => {
	killAll(exitPids);
});

module.exports = async (options = {}) => {
	if (options.title && options.title.length > 15) {
		throw new Error('The title can be maximum 15 characters');
	}

	const title = options.title ? `process.title = '${options.title}';` : '';

	const onlyForceKillableCode = `
		const handler = () => {
			console.log('I can only be killed with SIGKILL');
		};

		process.on('SIGTERM', handler);
		process.on('SIGINT', handler);
	`;

	const code = `
		${title}
		${options.onlyForceKillable ? onlyForceKillableCode : ''}
		setInterval(() => {}, 1000 * 1000);
		console.log('ok');
	`;

	return new Promise((resolve, reject) => {
		const subprocess = childProcess.spawn('node', ['-e', code], {
			detached: true
		});

		subprocess.on('error', reject);
		subprocess.stdout.setEncoding('utf8');

		subprocess.stdout.on('data', data => {
			if (data.trim() === 'ok') {
				subprocess.stdio = 'ignore';
				resolve(subprocess.pid);
			}
		});

		subprocess.unref();

		if (!options.persistent) {
			exitPids.add(subprocess.pid);
		}

		cleanupPids.add(subprocess.pid);
	});
};

module.exports.cleanup = () => {
	killAll(cleanupPids);
};
