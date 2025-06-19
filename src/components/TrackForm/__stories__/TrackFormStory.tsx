import React from 'react';
import TrackForm from '../TrackForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TTrackFormData } from '../../../types/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export interface TrackFormStoryProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: TTrackFormData) => void;
  genres?: string[];
  track?: any;
}

export function TrackFormStory(props: TrackFormStoryProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackForm {...props} onSubmit={props.onSubmit ?? (() => {})} />
    </QueryClientProvider>
  );
}
