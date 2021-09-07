var SegfaultHandler = require('segfault-handler')
test('test1', async () => {
  await new Promise(r => setTimeout(r, 200))
  expect('a').toBe('a')
  // process.exit(1) // OK - retries 3 times, and exits
  SegfaultHandler.causeSegfault() // Waits forever
})
