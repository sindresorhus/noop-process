import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';
import m from '.';

test('noopProcess()', async t => {
	// For `test2.js`
	await m({
		title: 'noop-process-2',
		persistent: true
	});

	const pid = await m({title: 'noop-process-1'});
	t.true(await processExists(pid));
});

test('`onlyForceKillable` option', async t => {
	const pid = await m({
		title: 'noop-process-3',
		onlyForceKillable: true
	});
	t.true(await processExists(pid));
	fkill(pid);
	t.true(await processExists(pid));
	fkill(pid, {force: true});
	t.false(await processExists(pid));
});
