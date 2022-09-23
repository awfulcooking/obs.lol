export default function setAsyncInterval(fn, ms=0) {
  let canceled = false

  async function loop() {
    if (canceled)
      return

    await fn()
    requestAnimationFrame(loop, ms)
  }

  requestAnimationFrame(loop, ms)

  return () => canceled = true
}
