import { useState } from 'react';
import { SlButton, SlCheckbox, SlInput, SlAlert, SlIcon } from '@shoelace-style/shoelace/dist/react';

import useOBS from './lib/useOBS'

import './ConnectForm.css'

export default function Connect({ onConnect }) {
  const obs = useOBS()

  const [ url, setUrl ] = useState()
  const [ pass, setPass ] = useState()
  const [ error, setError ] = useState()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      let dest = url || 'ws://localhost:4455'
      if (!dest.match(/^wss?:\/\//i))
        dest = `ws://${dest}`

      await obs.connect(dest, pass || null)
      onConnect(obs)
    } catch(ex) {
      setError(ex.message || `Error code ${ex.code}`)
    }
  }

  return (
    <div className="ConnectForm">
      <form onSubmit={handleSubmit}>
        <SlAlert variant="danger" open={error} closable onSlAfterHide={() => setError(null)}>
          <SlIcon slot="icon" name="exclamation-octagon" />
          <strong>Can't connect</strong>
          <br />
          {error}
        </SlAlert>
      
        <SlInput name="url" label="WebSocket URL" placeholder="localhost:4455" onSlInput={e => setUrl(e.target.value)} />
        <br />
        <SlInput name="pass" label="Password" type="password" onSlInput={e => setPass(e.target.value)} />
        <br />
        {/* <SlCheckbox>Auto-connect</SlCheckbox> */}
        {/* <br /> */}
        <br />
        <SlButton type="submit" variant="primary">
          Connect
        </SlButton>
      </form>

      <a className="repo-link" href="https://github.com/awfulcooking/obs.lol">source code</a>
    </div>
  );
};
