import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </QueryClientProvider>
    );
};

export default Provider;
