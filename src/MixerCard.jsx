import { Card, CardContent, CardHeader } from '@mui/material'

import InputVolumeSlider from './InputVolumeSlider'

export default function MixerCard({ inputName }) {
  return <Card variant="outlined">
    <CardHeader title={inputName} />
    <CardContent>
      <InputVolumeSlider inputName={inputName} />
    </CardContent>
  </Card> 
}
