import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';

test('persistent option', async t => {
	t.false(await processExists('noop-process-1'));
	t.true(await processExists('noop-process-2'));

	await fkill('noop-process-2');
});
