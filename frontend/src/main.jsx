import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import Vendas from './Vendas.jsx';
import Login from './Login.jsx';
import LoginWrapper from './LoginWrapper.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/vendas',
    element: (
      <LoginWrapper>
        <Vendas />
      </LoginWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);