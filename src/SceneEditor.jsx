import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { useState } from 'react'

import SceneList from './SceneList'
import SourceList from './SourceList'
import Projector from './Projector'
import InputProperties from './InputProperties'

export default function SceneEditor() {
  const [ selectedScene, setSelectedScene ] = useState()
  const [ selectedSource, setSelectedSource ] = useState()

  function onSceneSelect(sceneName) {
    if (selectedScene === sceneName)
      return;
    setSelectedScene(sceneName)
    setSelectedSource(null)
  }

  return <Grid container columns={24} sx={{ height: '100%', overflow: 'auto' }}>
    <Grid item xs={5} sx={{ height: '100%', overflow: 'auto' }}>
      <SceneList onSceneSelect={onSceneSelect} />
    </Grid>

    <Grid item xs={7} sx={{ height: '100%', overflow: 'auto' }}>
      <SourceList
        key={selectedScene}
        sceneName={selectedScene}
        selectedSource={selectedSource}
        onSourceSelect={setSelectedSource}
        autoSelectFirst />
    </Grid>

    <Grid item xs={12} sx={{ height: '100%', overflow: 'auto' }}>
      <Box>
        <Projector
          key={selectedSource}
          sourceName={selectedSource}
          refreshInterval={0}
          align="start" />
      </Box>

      <Box>
        <InputProperties inputName={selectedSource} />
      </Box>
    </Grid>
  </Grid>
}
