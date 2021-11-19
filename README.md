To reproduce https://github.com/facebook/jest/issues/11819

```sh
$ yarn
$ yarn test

PASS  __tests__/test2.js
NodeSegfaultHandlerNative: about to dereference NULL (will cause a SIGSEGV)

RUNS  __tests__/test1.js

Test Suites: 1 passed, 1 of 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        110 s ..
```

The important parts:
```js
// __tests__/test1.js
var SegfaultHandler = require('segfault-handler')
test('test1', async () => {
  await new Promise(r => setTimeout(r, 200))
  expect('a').toBe('a')
  // process.exit(1) // OK - retries 3 times, and exits
  SegfaultHandler.causeSegfault() // Waits forever
})

// __tests__/test2.js
test('test2', () => {
  expect('a').toBe('a')
})

jest --no-cache
// Runs forever
```
