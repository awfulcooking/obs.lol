import {
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './NavBar'

import SceneEditor from './SceneEditor'
import MixerView from './MixerView'
import ProjectorView from './ProjectorView'

import './App.css'

export default function App() {
  return <>
    <NavBar />

    <Routes>
      <Route path="/">
        <Route path="/mixer" element={<MixerView />} />
        <Route path="/projector" element={<ProjectorView refreshInterval={0} />} />
        <Route index element={<SceneEditor />} />
      </Route>
    </Routes>
  </>
}
