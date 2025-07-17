import TrackForm from '../TrackForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BaseTrack, TrackFormData } from '../../../types/types.ts';

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
  onSubmit?: (data: TrackFormData) => void;
  genres?: string[];
  track?: BaseTrack;
}

export function TrackFormStory(props: TrackFormStoryProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackForm {...props} onSubmit={props.onSubmit ?? (() => {})} />
    </QueryClientProvider>
  );
}
