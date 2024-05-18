import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './routes/root'
import MainPage from './routes/mainPage'
import Register from './routes/register';
import LogIn from './routes/login';

import ErrorPage from "./error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <LogIn />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
