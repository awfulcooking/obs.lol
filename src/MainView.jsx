import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'

import SceneList from './SceneList'
import SourceList from './SourceList'

export default function MainView() {
  const [ selectedScene, setSelectedScene ] = useState()

  return <Grid container>
    <Grid item xs={6}>
      <SceneList onSceneSelect={setSelectedScene} />
    </Grid>

    <Grid item xs={6}>
        <SourceList sceneName={selectedScene} />
    </Grid>
  </Grid>
}
