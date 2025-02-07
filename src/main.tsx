import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './routes/App.tsx';
import Provider from './Provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import YourAgent from './routes/YourAgent.tsx';
import LaunchAgent from './routes/LaunchAgent.tsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/launch-your-agent',
        element: <LaunchAgent />,
    },
    {
        path: '/your-agent',
        element: <YourAgent />,
    },
]);
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
