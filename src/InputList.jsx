import { useState, useEffect } from 'react'

import { Grid, Card, CardContent, CardHeader, Slider } from '@mui/material'

import { EventSubscription } from 'obs-websocket-js'
import useOBS from './lib/useOBS'

import InputVolumeSlider from './InputVolumeSlider'

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

  return <Grid container spacing={0.3} columns={{ xs: 4, sm: 6, md: 8 }}>
    {inputs?.map((input) =>
      <Grid item xs={2} key={input.inputName}>
        <Card variant="outlined">
          <CardHeader title={input.inputName} />
          <CardContent>
            <InputVolumeSlider inputName={input.inputName} />
          </CardContent>
        </Card>
      </Grid>
    )}
  </Grid>
}