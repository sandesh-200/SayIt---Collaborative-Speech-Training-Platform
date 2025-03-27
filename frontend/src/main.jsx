import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { ProfileProvider } from './context/ProfileContext.jsx'
import { SpeechProvider } from './context/SpeechContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <SpeechProvider>
    <App />
    </SpeechProvider>
    </ProfileProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
