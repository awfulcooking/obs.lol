import {
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './lib/theme'

import NavBar from './NavBar'

import SceneEditor from './SceneEditor'
import MixerView from './MixerView'
import ProjectorView from './ProjectorView'

import './App.css'

export default function App() {
  return <ThemeProvider theme={theme}>
    <NavBar />

    <div style={{ flex: 1, overflow: 'auto' }}>
      <Routes>
        <Route path="/">
          <Route path="/mixer" element={<MixerView />} />
          <Route path="/projector" element={<ProjectorView refreshInterval={0} />} />
          <Route index element={<SceneEditor />} />
        </Route>
      </Routes>
    </div>
  </ThemeProvider>
}
