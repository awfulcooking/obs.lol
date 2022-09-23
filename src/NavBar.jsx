import { Link, useLocation } from 'react-router-dom'

import { Grid, Tabs, Tab, Button } from '@mui/material'

import ProjectorIcon from '@mui/icons-material/DesktopMacOutlined'

import useOBS from './lib/useOBS'

export default function NavBar() {
  const obs = useOBS()
  const location = useLocation()

  return <Grid container role="navigation">
    <Grid item sx={{ flexGrow: 1 }}>
      <Tabs value={location.pathname}>
        <Tab label="Scenes" value="/" to="/" component={Link} />
        <Tab label="Mixer" value="/mixer" to="/mixer" component={Link} />
        <Tab label={<ProjectorIcon />} value="/projector" to="/projector" component={Link} />
      </Tabs>
    </Grid>

    <Grid item>
      <Button
        onClick={() => obs.disconnect()}
        color="error"
        sx={{ height: '100%', marginRight: '0.5em' }}
      >Logout</Button>
    </Grid>
  </Grid>
}
