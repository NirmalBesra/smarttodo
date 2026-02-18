import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FormUI from './formUI';
import Home from './home';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
