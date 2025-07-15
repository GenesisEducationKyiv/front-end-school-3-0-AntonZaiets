import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import TrackAudioPlayer from '@/components/TrackItem/components/TrackAudioPlayer/TrackAudioPlayer';
import { Box } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Avatar from '@/ui/Avatar/Avatar';

const meta: Meta<typeof Card> = {
  title: 'ui/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'filled', 'outlined'],
    },
    elevation: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
    },
  },
  args: {
    variant: 'elevated',
    elevation: 1,
    sx: {
      width: 300,
      height: 420,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const mockTrack = {
  id: '1751760427893',
  album: 'Super',
  title: 'Peaches',
  artist: 'Taylor Swift',
  genres: ['Electronic', 'Classical'],
  slug: 'peaches',
  coverImage: 'https://picsum.photos/seed/Peaches/300/300.webp',
  audioFile: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
  createdAt: '2025-07-06T00:07:07.893Z',
  updatedAt: '2025-07-06T00:07:07.893Z',
};

type ImageType = 'avatar' | 'media';

function renderCard({
  imageType,
  hasAudio,
}: {
  imageType: ImageType;
  hasAudio: boolean;
}) {
  return (
    <>
      {imageType === 'avatar' ? (
        <Avatar
          alt={mockTrack.title}
          variant="square"
          sx={{
            width: '100%',
            height: 120,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
      ) : (
        <CardMedia
          component="img"
          height="120"
          image={mockTrack.coverImage}
          alt={mockTrack.title}
        />
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6">{mockTrack.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {mockTrack.artist} — {mockTrack.album}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Genres: {mockTrack.genres.join(', ')}
          </Typography>
        </Box>

        {hasAudio && (
          <Box sx={{ mt: 2 }}>
            <TrackAudioPlayer
              audioUrl={mockTrack.audioFile}
              trackId={mockTrack.id}
            />
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant={hasAudio ? 'contained' : 'outlined'}
          color="primary"
          startIcon={<CloudUpload />}
        >
          Upload
        </Button>
      </CardActions>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Card {...meta.args}>
      {renderCard({ imageType: 'avatar', hasAudio: false })}
    </Card>
  ),
};

export const TrackCardWithImage: Story = {
  render: () => (
    <Card {...meta.args}>
      {renderCard({ imageType: 'media', hasAudio: false })}
    </Card>
  ),
};

export const TrackCardWithAudio: Story = {
  render: () => (
    <Card {...meta.args}>
      {renderCard({ imageType: 'avatar', hasAudio: true })}
    </Card>
  ),
};

export const TrackCardFull: Story = {
  render: () => (
    <Card {...meta.args}>
      {renderCard({ imageType: 'media', hasAudio: true })}
    </Card>
  ),
};
