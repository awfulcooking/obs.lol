import { useState, useEffect, useContext } from 'react'

import { Grid, Card, CardContent, CardHeader, Slider } from '@mui/material'

import { EventSubscription } from 'obs-websocket-js'
import OBSContext from './lib/obsContext'

export default function InputList() {
  const obs = useContext(OBSContext)
  const [ inputs, setInputs ] = useState()

  useEffect(() => {
    function changed(data) {
      if (data.inputs)
        setInputs(data.inputs)
    }

    obs.call('GetInputList').then(changed)

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
            <Slider
              value={50}
              min={0}
              max={100}
            />
          </CardContent>
        </Card>
      </Grid>
    )}
  </Grid>
}