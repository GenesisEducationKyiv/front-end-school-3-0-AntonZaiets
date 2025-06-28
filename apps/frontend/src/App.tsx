import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator.tsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyTracksPage } from './components/LazyComponents/LazyComponents.tsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Suspense
          fallback={<LoadingIndicator width={'100dvw'} height={'100dvh'} />}
        >
          <Routes>
            <Route path="/tracks" element={<LazyTracksPage />} />
            <Route path="/" element={<Navigate to="/tracks" replace />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
        <ToastContainer
          data-testid="toast-container"
          position="bottom-right"
          autoClose={3000}
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;
