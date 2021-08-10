import process from 'node:process';
import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';
import semver from 'semver';

if (process.platform === 'linux' && semver.gte(process.version, '12.17.0')) {
	// https://github.com/nodejs/node/issues/35503
	test.failing('noop-process title option can\'t work in Linux on Node.js >=12.17', async t => {
		const exists = await processExists('noop-process-2');
		t.fail(`Exists: ${exists}`);
	});
} else {
	test('persistent option', async t => {
		t.false(await processExists('noop-process-1'));
		t.true(await processExists('noop-process-2'));

		await fkill('noop-process-2');
	});
}
