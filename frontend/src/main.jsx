import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, HashRouter } from "react-router";
import App from './App.jsx'
import { DEMO_MODE } from './api.js'

// The demo build is hosted on GitHub Pages, which has no SPA rewrite: a request
// for /projects/artsconnect/Main would 404 before React ever loads. Keeping the
// demo's routes in the hash sidesteps that entirely. The real app, served by
// Django, keeps clean paths.
const Router = DEMO_MODE ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
