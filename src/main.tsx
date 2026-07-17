import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import './index.css'
import { router } from '@/lib/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
