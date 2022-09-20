import {
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Box, Tabs, Tab } from '@mui/material'

import Connection from './Connection'
import MainView from './MainView'
import MixerView from './MixerView'

import './App.css'

export default function App() {
  const location = useLocation()

  return <Connection>
    <Box sx={{ width: '100%' }}>
      <Tabs value={location.pathname}>
        <Tab label="Scene Editor" value="/" to="/" component={Link} />
        <Tab label="Mixer" value="/mixer" to="/mixer" component={Link} />
      </Tabs>
    </Box>

    <Box sx={{ width: '100%' }}>
      <Routes>
        <Route path="/">
          <Route path="/mixer" element={<MixerView />} />
          <Route index element={<MainView />} />
        </Route>
      </Routes>
    </Box>
  </Connection>
}
