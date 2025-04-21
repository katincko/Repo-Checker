import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './global.css'

// quando usa o export default, o nome do arquivo tu pode escolher tlgd.
// mas ali no import {PI} tu tem q usar o nome certinho

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
