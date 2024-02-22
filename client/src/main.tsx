import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PhotosPage from './photo/page/PhotosPage';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhotosPage />,
  },
  {
    path: '/about',
    element: <p>ABOUT</p>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <main>
        <RouterProvider router={router} />
      </main>
      <footer>
      </footer>
    </ThemeProvider>
  </React.StrictMode>,
)
