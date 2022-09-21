import { useState, useEffect } from 'react'

import { Grid } from '@mui/material'

import { EventSubscription } from 'obs-websocket-js'
import useOBS from './lib/useOBS'

import MixerCard from './MixerCard'

export default function InputList() {
  const obs = useOBS()
  const [ inputs, setInputs ] = useState()

  useEffect(() => {
    obs.call('GetInputList').then(async ({ inputs }) => {
      const hasAudioChecks = await Promise.allSettled(inputs.map(({ inputName }) => obs.call('GetInputVolume', { inputName })))
      const audioInputs = inputs.filter((_, i) => hasAudioChecks[i].status == 'fulfilled')
      setInputs(audioInputs)
    })

    // obs.reidentify({
    //   eventSubscriptions: EventSubscription.General | EventSubscription.InputVolumeMeters,
    // })
  
    // obs.on('InputVolumeMeters', changed)
    return () => {
      // obs.off('InputVolumeMeters', changed)
      // obs.off('InputListChanged', changed)
      // obs.off('CurrentProgramInputChanged', changed)

      // obs.reidentify({
      //   eventSubscriptions: EventSubscription.General,
      // })
    }
  }, [])

  return <Grid container spacing={0.3} columns={{ xs: 2, md: 4, lg: 6 }}>
    {inputs?.map(({ inputName }) =>
      <Grid item xs={2} key={inputName}>
        <MixerCard inputName={inputName} />
      </Grid>
    )}
  </Grid>
}