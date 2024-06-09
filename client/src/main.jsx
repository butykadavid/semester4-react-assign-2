import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import { store } from './states/store';

import Root from './routes/root'
import MainPage from './routes/mainPage'
import Register from './routes/register';
import LogIn from './routes/login';
import Profile from './routes/profile';

import ErrorPage from "./error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import NewJob from './routes/newJob';
import JobDetails from './routes/jobDetails';

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
      },
      {
        path: "/profile/:profileId",
        element: <Profile />
      },
      {
        path: "/newjob",
        element: <NewJob />
      },
      {
        path: "/jobdetails/:jobId",
        element: <JobDetails />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)