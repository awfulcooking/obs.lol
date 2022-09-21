export default function setAsyncInterval(fn, ms=0) {
  let canceled = false

  async function loop() {
    if (canceled)
      return

    await fn()
    setTimeout(loop, ms)
  }

  setTimeout(loop, ms)

  return () => canceled = true
}
