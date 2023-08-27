import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import HomePage from './pages/homepage/Homepage';
import StagePage from './pages/stagepage/Stagepage';
import MyProvider from './components/context/MyProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App><HomePage></HomePage></App>
  },
  {
    path:'/map/:id',
    element:<App><StagePage></StagePage></App>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
    <RouterProvider router={router} />
    </MyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
