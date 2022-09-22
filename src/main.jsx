import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './index.css'

import '@shoelace-style/shoelace/dist/themes/dark.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import Connection from './Connection'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.82/dist/');

ReactDOM.createRoot(document.querySelector('main')).render(
  <React.StrictMode>
    <Router>
      <Connection>
        <App />
      </Connection>
    </Router>
  </React.StrictMode>
)
