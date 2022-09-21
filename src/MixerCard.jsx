import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, IconButton } from '@mui/material'

import InputVolumeSlider from './InputVolumeSlider'
import VolumeIcon from './VolumeIcon'

export default function MixerCard({ inputName }) {
  const [ mute, setMute ] = useState()
  const [ volume, setVolume ] = useState()

  async function refresh() {
    const { inputMuted } = await obs.call('GetInputMute', { inputName })
    setMute(inputMuted)
  }

  function toggleMuteInOBS() {
    obs.call('ToggleInputMute', { inputName })
  }

  function onOBSMuteChange(change) {
    if (change.inputName === inputName)
      setMute(change.inputMuted)
  }

  useEffect(() => {
    refresh()
    obs.on('InputMuteStateChanged', onOBSMuteChange)
    return () => obs.off('InputMuteStateChanged', onOBSMuteChange)
  }, [ inputName ])

  return <Card raised>
    <CardHeader title={inputName} action={
        <IconButton onClick={toggleMuteInOBS}>
          <VolumeIcon volume={volume} muted={mute} color={mute ? "error" : "default"} />
        </IconButton>
      } />

    <CardContent>
      <InputVolumeSlider color={mute ? "error" : "primary"} inputName={inputName} monitordB={setVolume} />
    </CardContent>
  </Card> 
}
