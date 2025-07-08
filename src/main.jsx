import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Outlet } from 'react-router'
import {
  RouterProvider,
} from "react-router";
import { router } from './routes/ParticipantRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
