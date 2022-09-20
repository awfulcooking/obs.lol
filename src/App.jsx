import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
  useResolvedPath,
  useNavigate,
} from "react-router-dom";

import { useEffect, useRef } from 'react'

import Connection from './Connection'
import MainView from './MainView'
import MixerView from './MixerView'

import './App.css'
import { SlTab, SlTabGroup, SlTabPanel } from "@shoelace-style/shoelace/dist/react";

function NavTab({ to, children, end=true, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end });
  const navigate = useNavigate()

  function go() {
    navigate(to)
  }

  return <SlTab active={match} slot="nav" onClick={go} {...props}>{children}</SlTab>
}

export default function App() {
  return <Connection>
    <Router>
      <SlTabGroup>
        <NavTab to="/">
          Main
        </NavTab>
        <NavTab to="/mixer">
          Mixer
        </NavTab>
      </SlTabGroup>

      <Routes>
        <Route path="/">
          <Route path="/mixer" element={<MixerView />} />
          <Route index element={<MainView />} />
        </Route>
      </Routes>
    </Router>
  </Connection>
}
