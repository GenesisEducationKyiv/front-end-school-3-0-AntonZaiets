import { Routes, Route, Navigate } from 'react-router-dom';
import TrackPage from './pages/TracksPage/TracksPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/tracks" element={<TrackPage />} />
          <Route path="/" element={<Navigate to="/tracks" replace />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
