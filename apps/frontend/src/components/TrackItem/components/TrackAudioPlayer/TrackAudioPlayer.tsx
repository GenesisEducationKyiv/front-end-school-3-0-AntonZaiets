import Box from '@/ui/Box/Box.tsx';

const TrackAudioPlayer = ({
  audioUrl,
  trackId,
}: {
  audioUrl: string | null;
  trackId: string;
}) =>
  audioUrl ? (
    <Box sx={{ width: '100%' }}>
      <audio
        controls
        src={audioUrl}
        style={{ width: '100%' }}
        data-testid={`audio-player-${trackId}`}
      />
    </Box>
  ) : null;

export default TrackAudioPlayer;
