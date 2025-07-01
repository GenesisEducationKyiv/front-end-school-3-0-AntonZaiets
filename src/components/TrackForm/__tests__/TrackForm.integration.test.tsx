import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackForm from '../TrackForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { test, expect, vi } from 'vitest';

const mockGenres = ['Rock', 'Pop', 'Jazz'];

const mockTrack = {
  id: '1',
  title: 'Test Track',
  artist: 'Test Artist',
  album: 'Test Album',
  coverImage: 'test-cover.jpg',
  genres: ['Rock', 'Pop'],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('should handle form submission with valid data', async () => {
  const onSubmit = vi.fn();

  const titleInput = screen.getByTestId('input-title');
  const artistInput = screen.getByTestId('input-artist');
  const albumInput = screen.getByTestId('input-album');
  const coverImageInput = screen.getByTestId('input-cover-image');
  await userEvent.type(titleInput, 'New Track');
  await userEvent.type(artistInput, 'New Artist');
  await userEvent.type(albumInput, 'New Album');
  await userEvent.type(coverImageInput, 'https://example.com/new-cover.jpg');

  const genreInputBox = screen
    .getByTestId('genre-selector')
    .querySelector('input');
  await userEvent.type(genreInputBox!, 'Rock');
  const rockOption = await screen.findByText('Rock');
  await userEvent.click(rockOption);
  await userEvent.tab();

  await userEvent.clear(genreInputBox!);
  await userEvent.type(genreInputBox!, 'Pop');
  const popOption = await screen.findByText('Pop');
  await userEvent.click(popOption);
  await userEvent.tab();

  expect(screen.getByTestId('genre-Rock')).toBeInTheDocument();
  expect(screen.getByTestId('genre-Pop')).toBeInTheDocument();

  const submitButton = screen.getByTestId('submit-button');
  await userEvent.click(submitButton);

  expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
  expect(screen.queryByText('Artist is required')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Select at least one genre')
  ).not.toBeInTheDocument();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalled();
    const call = onSubmit.mock.calls[0][0];
    expect(call).toEqual({
      title: 'New Track',
      artist: 'New Artist',
      album: 'New Album',
      coverImage: 'https://example.com/new-cover.jpg',
      genres: ['Rock', 'Pop'],
    });
  });
});

test('should handle form validation errors', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TrackForm
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        genres={mockGenres}
      />
    </QueryClientProvider>,
    { container: document.body }
  );

  await userEvent.click(screen.getByTestId('submit-button'));

  expect(screen.getByText('Title is required')).toBeInTheDocument();
  expect(screen.getByText('Artist is required')).toBeInTheDocument();
  expect(screen.getByText('Select at least one genre')).toBeInTheDocument();
});

test('should handle edit mode with existing track data', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TrackForm
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        genres={mockGenres}
        track={mockTrack}
      />
    </QueryClientProvider>,
    { container: document.body }
  );

  const titleInput = screen.getByTestId('input-title');
  const artistInput = screen.getByTestId('input-artist');
  const albumInput = screen.getByTestId('input-album');
  const coverImageInput = screen.getByTestId('input-cover-image');

  await waitFor(() => {
    expect(titleInput).toHaveValue('Test Track');
    expect(artistInput).toHaveValue('Test Artist');
    expect(albumInput).toHaveValue('Test Album');
    expect(coverImageInput).toHaveValue('test-cover.jpg');
  });

  expect(screen.getByTestId('genre-Rock')).toBeInTheDocument();
  expect(screen.getByTestId('genre-Pop')).toBeInTheDocument();
});

test('should handle form cancellation', async () => {
  const onClose = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <TrackForm
        open={true}
        onClose={onClose}
        onSubmit={() => {}}
        genres={mockGenres}
      />
    </QueryClientProvider>,
    { container: document.body }
  );

  await userEvent.click(screen.getByTestId('cancel-button'));
  expect(onClose).toHaveBeenCalled();
});
