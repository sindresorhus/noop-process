import test from 'ava';
import processExists from 'process-exists';
import fn from './';

test('noopProcess()', async t => {
	// for test2.js
	await fn({
		title: 'noop-process-2',
		persistent: true
	});

	const pid = await fn({title: 'noop-process-1'});
	t.true(await processExists(pid));
});
