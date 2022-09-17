import { useState } from 'react'

import Connect from './Connect'

export default function App({ Component, pageProps }) {
  const [ connection, setConnection ] = useState()
  pageProps = Object.assign({}, pageProps, { connection })

  function connected(obs) {
    console.info('connected', obs);
    setConnection(obs)
  }

  const content = connection
     ? <p>Connected</p>
     : <Connect onConnect={connected} />

  return <main>
    {content}
  </main>
}
