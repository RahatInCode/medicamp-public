import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { RouterProvider } from 'react-router'; // 🔁 double-check this import!
import { router } from './routes/ParticipantRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// 🧠 Create query client instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
      
    </QueryClientProvider>
  </StrictMode>
);
