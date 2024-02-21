import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PhotosPage from './photo/page/PhotosPage';


const router = createBrowserRouter([
  {
    path: "/",
    // element: <ImageUploader />,
    element: <PhotosPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main>
      <RouterProvider router={router} />
    </main>
    <footer></footer>
  </React.StrictMode>,
)
