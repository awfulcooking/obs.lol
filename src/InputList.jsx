import { useState, useEffect, useContext } from 'react'

import { SlCard } from '@shoelace-style/shoelace/dist/react'

import { EventSubscription } from 'obs-websocket-js'
import OBSContext from './lib/obsContext'

export default function InputList({ onInputSelect }) {
  const obs = useContext(OBSContext)

  const [ inputs, setInputs ] = useState()

  useEffect(() => {
    function changed(data) {
      if (data.inputs)
        setInputs(data.inputs)
    }

    obs.call('GetInputList').then(changed)

    obs.reidentify({
      eventSubscriptions: EventSubscription.General | EventSubscription.InputVolumeMeters,
    })
  
    obs.on('InputVolumeMeters', changed)
    return () => {
      obs.off('InputVolumeMeters', changed)
      // obs.off('InputListChanged', changed)
      // obs.off('CurrentProgramInputChanged', changed)

      obs.reidentify({
        eventSubscriptions: EventSubscription.General,
      })
    }
  }, [])

  return <>
    {inputs?.map((input) =>
      <SlCard key={input.inputName}>
        <div slot="header">
          <strong>{input.inputName}</strong>
        </div>
        {JSON.stringify(input)}
      </SlCard>
    )}
  </>
}