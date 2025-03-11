import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import router from './router/router.tsx'
import "@fontsource/lato/index.css";
import "@fontsource/lato/700.css";
import "@fontsource/open-sans/index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/inter/index.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
