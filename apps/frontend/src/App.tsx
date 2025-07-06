import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

const TrackPage = lazy(() => import('./pages/TracksPage/TracksPage.tsx'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Suspense
          fallback={<LoadingIndicator message="Loading application..." />}
        >
          <Routes>
            <Route path="/tracks" element={<TrackPage />} />
            <Route path="/" element={<Navigate to="/tracks" replace />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </QueryClientProvider>
  );
};

export default App;
