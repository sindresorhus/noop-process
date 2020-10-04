# noop-process [![Build Status](https://travis-ci.org/sindresorhus/noop-process.svg?branch=master)](https://travis-ci.org/sindresorhus/noop-process)

> Create a noop (no operation) process and get the PID

Useful for testing purposes.


## Install

```
$ npm install noop-process
```


## Usage

```js
const noopProcess = require('noop-process');

(async () => {
	const pid = await noopProcess();

	console.log(pid);
	//=> 1337
})();
```


## API

### noopProcess(options?)

Creates a [noop](https://en.wikipedia.org/wiki/NOP_(code)) process.

Returns a `Promise<number>` with the process ID of the created process.

#### options

Type: `object`

##### title

Type: `string`

Give the process a [title](https://nodejs.org/api/process.html#process_process_title) to make it easier to see it in `ps` or kill it with `killall`.

Maximum 15 characters, as anything longer will be truncated by the system.

##### persistent

Type: `boolean`<br>
Default: `false`

Let the process continue to live after the main process exits.

##### onlyForceKillable

Type: `boolean`<br>
Default: `false`

Make the process only killable with `SIGKILL`.

### noopProcess.cleanup()

All the processes are cleaned up when the main process exits, but you can use this if you need them cleaned up earlier.
