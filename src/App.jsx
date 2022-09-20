import {
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Grid, Tabs, Tab, Toolbar, Button } from '@mui/material'

import SceneEditor from './SceneEditor'
import MixerView from './MixerView'

import { useContext } from "react"
import OBSContext from "./lib/obsContext"

import './App.css'

export default function App() {
  const location = useLocation()
  const obs = useContext(OBSContext)

  return <>
    <Toolbar disableGutters>
      <Grid container columns={5}>
        <Grid item xs={4}>
          <Tabs value={location.pathname}>
            <Tab label="Scene Editor" value="/" to="/" component={Link} />
            <Tab label="Mixer" value="/mixer" to="/mixer" component={Link} />
          </Tabs>
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={() => obs.disconnect()}
            fullWidth={true}
            color="error"
            sx={{ height: '100%' }}
          >Logout</Button>
        </Grid>
      </Grid>
    </Toolbar>

    <Routes>
      <Route path="/">
        <Route path="/mixer" element={<MixerView />} />
        <Route index element={<SceneEditor />} />
      </Route>
    </Routes>
  </>
}
