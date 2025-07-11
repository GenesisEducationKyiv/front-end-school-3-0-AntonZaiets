import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Dialog from '@/ui/Dialog/Dialog.tsx';
import DialogTitle from '@/ui/DialogTitle/DialogTitle.tsx';
import DialogContent from '@/ui/DialogContent/DialogContent.tsx';
import TextField from '@/ui/TextField/TextField.tsx';
import Autocomplete from '@/ui/Autocomplete/Autocomplete.tsx';
import Chip from '@/ui/Chip/Chip.tsx';
import Button from '@/ui/Button/Button.tsx';
import DialogActions from '@/ui/DialogActions/DialogActions.tsx';
import IconButton from '@/ui/IconButton/IconButton.tsx';
import { ITrackForm, defaultGenres } from './Interface';
import { TTrackFormData } from '@/types/types.ts';
import Close from '@mui/icons-material/Close';

const TrackForm = ({
  open,
  onClose,
  track,
  genres = defaultGenres,
  onSubmit,
}: ITrackForm) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTrackFormData>({
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      genres: [],
      coverImage: '',
    },
  });

  useEffect(() => {
    if (track) {
      reset({
        title: track.title,
        artist: track.artist,
        album: track.album || '',
        genres: track.genres || [],
        coverImage: track.coverImage || '',
      });
    }
  }, [track, reset]);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      data-testid="track-form-modal"
    >
      <DialogTitle>
        {track ? 'Edit Track' : 'Create New Track'}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          data-testid="close-form-button"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form
        key={track?.id || 'new'}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <DialogContent sx={{ display: 'grid', gap: 2 }}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                inputProps={{ 'data-testid': 'input-title' }}
              />
            )}
          />
          <Controller
            name="artist"
            control={control}
            rules={{ required: 'Artist is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Artist"
                fullWidth
                error={!!errors.artist}
                helperText={errors.artist?.message}
                inputProps={{ 'data-testid': 'input-artist' }}
              />
            )}
          />
          <Controller
            name="album"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Album"
                fullWidth
                inputProps={{ 'data-testid': 'input-album' }}
              />
            )}
          />
          <Controller
            name="genres"
            control={control}
            shouldUnregister={true}
            rules={{
              validate: (value) =>
                value && value.length > 0 ? true : 'Select at least one genre',
            }}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={genres || []}
                value={field.value || []}
                onChange={(_, value) => field.onChange(value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        {...tagProps}
                        label={option}
                        data-testid={`genre-${option}`}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Genres"
                    error={!!errors.genres}
                    helperText={
                      typeof errors.genres?.message === 'string'
                        ? errors.genres?.message
                        : ''
                    }
                    data-testid="genre-selector"
                  />
                )}
              />
            )}
          />
          <Controller
            name="coverImage"
            control={control}
            rules={{
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Invalid URL format',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cover Image URL"
                fullWidth
                error={!!errors.coverImage}
                helperText={errors.coverImage?.message}
                inputProps={{ 'data-testid': 'input-cover-image' }}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} data-testid="cancel-button">
            Cancel
          </Button>
          <Button type="submit" variant="contained" data-testid="submit-button">
            {track ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TrackForm;
