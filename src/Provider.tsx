import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
                clientId={
                    '1083898684952-op7cr4bf49mvsp0q4j7pbltofkctjksv.apps.googleusercontent.com'
                }
            >
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </GoogleOAuthProvider>
        </QueryClientProvider>
    );
};

export default Provider;
