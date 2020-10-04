import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';
import semver from 'semver';
import noopProcess from '.';

test('noopProcess()', async t => {
	// For `test2.js`
	await noopProcess({
		title: 'noop-process-2',
		persistent: true
	});

	const pid = await noopProcess({title: 'noop-process-1'});
	t.true(await processExists(pid));
});

if (process.platform === 'linux' && semver.gte(process.version, '12.17.0')) {
	test.failing('noop-process title option can\'t work in linux on node > 12.17', async t => {
		t.fail(await processExists('noop-process-1'));
	})
}

test('`onlyForceKillable` option', async t => {
	const pid = await noopProcess({
		title: 'noop-process-3',
		onlyForceKillable: true
	});
	t.true(await processExists(pid));

	await fkill(pid);
	t.true(await processExists(pid));

	await fkill(pid, {force: true});
	t.false(await processExists(pid));
});
