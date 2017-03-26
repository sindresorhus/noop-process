import test from 'ava';
import processExists from 'process-exists';
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
