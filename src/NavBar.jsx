import { Link, useLocation } from 'react-router-dom'

import { Grid, Tabs, Tab, Button } from '@mui/material'

import useOBS from './lib/useOBS'

export default function NavBar() {
  const obs = useOBS()
  const location = useLocation()

  return <Grid container columns={5} role="navigation">
    <Grid item xs={4}>
      <Tabs value={location.pathname}>
        <Tab label="Scene Editor" value="/" to="/" component={Link} />
        <Tab label="Mixer" value="/mixer" to="/mixer" component={Link} />
        <Tab label="Projector" value="/projector" to="/projector" component={Link} />
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
}
