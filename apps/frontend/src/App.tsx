import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import { material3Theme } from '@/theme';

const TrackPage = lazy(() => import('./pages/TracksPage/TracksPage.tsx'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
    <ThemeProvider theme={material3Theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Suspense
            fallback={<LoadingIndicator width={'100dvw'} height={'100dvh'} />}
          >
            <Routes>
              <Route path="/tracks" element={<TrackPage />} />
              <Route path="/" element={<Navigate to="/tracks" replace />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Suspense>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
