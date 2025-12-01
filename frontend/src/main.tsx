import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'

// Set Axios Base URL
axios.defaults.baseURL = 'https://ombudsman-frontend-production-6c5b.up.railway.app';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
