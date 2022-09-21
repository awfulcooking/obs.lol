import {
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './NavBar'

import SceneEditor from './SceneEditor'
import MixerView from './MixerView'

import './App.css'

export default function App() {
  return <>
    <NavBar />

    <Routes>
      <Route path="/">
        <Route path="/mixer" element={<MixerView />} />
        <Route index element={<SceneEditor />} />
      </Route>
    </Routes>
  </>
}
