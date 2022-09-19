import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link
} from "react-router-dom";

import Connection from './Connection'
import MainView from './MainView'
import MixerView from './MixerView'

import './App.css'
import { SlTab, SlTabGroup, SlTabPanel } from "@shoelace-style/shoelace/dist/react";

export default function App() {
  return <Connection>
    <SlTabGroup>
      <SlTab slot="nav" panel="main">
        Main
      </SlTab>
      <SlTab slot="nav" panel="mixer">
        Mixer
      </SlTab>

      <SlTabPanel name="mixer">
        <MixerView />
      </SlTabPanel>

      <SlTabPanel name="main">
        <MainView />
      </SlTabPanel>
    </SlTabGroup>
  </Connection>
}
