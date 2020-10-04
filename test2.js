import test from 'ava';
import processExists from 'process-exists';
import fkill from 'fkill';

if (process.platform === 'linux' && semver.gte(process.version, '12.17.0')) {
	test.failing('noop-process title option can\'t work in linux on node > 12.17', async t => {
		t.fail(await processExists('noop-process-2'));
	})
} else {
	test('persistent option', async t => {
		t.false(await processExists('noop-process-1'));
		t.true(await processExists('noop-process-2'));

		await fkill('noop-process-2');
	});
}
