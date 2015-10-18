import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';
import pify from 'pify';

test('persistent option', async t => {
	t.false(await processExists('noop-process-1'));
	t.true(await processExists('noop-process-2'));

	await pify(fkill)('noop-process-2');
});
