import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import Provider from './Provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
]);
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
