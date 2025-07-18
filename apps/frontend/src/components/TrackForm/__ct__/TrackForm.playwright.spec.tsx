import { test, expect } from '@playwright/experimental-ct-react';
import { TrackFormStory } from '../__stories__/TrackFormStory.tsx';

const mockGenres = ['Rock', 'Pop', 'Jazz'];

const mockTrack = {
  id: '1',
  title: 'Test Track',
  artist: 'Test Artist',
  album: 'Test Album',
  coverImage: 'https://example.com/test-cover.jpg',
  genres: ['Rock', 'Pop'],
};

test('should render form fields correctly', async ({ mount, page }) => {
  await mount(
    <TrackFormStory
      open={true}
      onClose={() => {}}
      onSubmit={() => {}}
      genres={mockGenres}
    />
  );

  const titleInput = page.locator('[data-testid="input-title"]');
  const artistInput = page.locator('[data-testid="input-artist"]');
  const albumInput = page.locator('[data-testid="input-album"]');
  const coverImageInput = page.locator('[data-testid="input-cover-image"]');
  const genreSelector = page.locator('[data-testid="genre-selector"]');

  await expect(titleInput).toBeVisible();
  await expect(artistInput).toBeVisible();
  await expect(albumInput).toBeVisible();
  await expect(coverImageInput).toBeVisible();
  await expect(genreSelector).toBeVisible();
});

test('should handle form input and submission', async ({ mount, page }) => {
  let submittedData: any = null;
  const onSubmit = (data: any) => {
    submittedData = data;
  };
  await mount(
    <TrackFormStory
      open={true}
      onClose={() => {}}
      onSubmit={onSubmit}
      genres={mockGenres}
    />
  );

  const titleInput = page.locator('[data-testid="input-title"]');
  const artistInput = page.locator('[data-testid="input-artist"]');
  const albumInput = page.locator('[data-testid="input-album"]');
  const coverImageInput = page.locator('[data-testid="input-cover-image"]');
  const genreSelector = page.locator('[data-testid="genre-selector"]');
  const submitButton = page.locator('[data-testid="submit-button"]');

  await titleInput.fill('New Track');
  await artistInput.fill('New Artist');
  await albumInput.fill('New Album');
  await coverImageInput.fill('https://example.com/new-cover.jpg');

  const genreInput = genreSelector.locator('input');
  await genreInput.fill('Rock');
  const rockOption = page.locator('text=Rock');
  await rockOption.click();
  await genreInput.fill('Pop');
  const popOption = page.locator('text=Pop');
  await popOption.click();

  await submitButton.click();

  await expect.poll(() => submittedData).not.toBeNull();
  expect(submittedData).toMatchObject({
    title: 'New Track',
    artist: 'New Artist',
    album: 'New Album',
    coverImage: 'https://example.com/new-cover.jpg',
    genres: ['Rock', 'Pop'],
  });
});

test('should handle form cancellation', async ({ mount, page }) => {
  let cancelled = false;
  const onClose = () => {
    cancelled = true;
  };
  await mount(
    <TrackFormStory
      open={true}
      onClose={onClose}
      onSubmit={() => {}}
      genres={mockGenres}
    />
  );

  const cancelButton = page.locator('[data-testid="cancel-button"]');
  await cancelButton.click();
  await expect.poll(() => cancelled).toBe(true);
});

test('should handle edit mode', async ({ mount, page }) => {
  await mount(
    <TrackFormStory
      open={true}
      onClose={() => {}}
      onSubmit={() => {}}
      genres={mockGenres}
      track={mockTrack}
    />
  );

  const titleInput = page.locator('[data-testid="input-title"]');
  const artistInput = page.locator('[data-testid="input-artist"]');
  const albumInput = page.locator('[data-testid="input-album"]');
  const coverImageInput = page.locator('[data-testid="input-cover-image"]');
  const modal = page.locator('[data-testid="track-form-modal"]');
  const genreSelector = page.locator('[data-testid="genre-selector"]');
  const submitButton = page.locator('[data-testid="submit-button"]');

  await expect(titleInput).toHaveValue('Test Track');
  await expect(artistInput).toHaveValue('Test Artist');
  await expect(albumInput).toHaveValue('Test Album');
  await expect(coverImageInput).toHaveValue(
    'https://example.com/test-cover.jpg'
  );

  await titleInput.fill('Edited Track');
  await expect(titleInput).toHaveValue('Edited Track');

  await modal.click();

  const popDeleteBtn = page.locator('[data-testid="genre-Pop"] svg').first();
  await popDeleteBtn.click();

  const genreInput = genreSelector.locator('input');
  await genreInput.fill('Jazz');
  const jazzOption = page.locator('text=Jazz');
  await jazzOption.click();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-testid="genre-Jazz"]')).toBeVisible();

  await submitButton.click();

  const requiredErrors = page.locator('[data-testid*="error-required"]');
  const genreError = page.locator('[data-testid="error-genre"]');
  await expect(requiredErrors).toHaveCount(0);
  await expect(genreError).toHaveCount(0);

  const submittedTitle = await titleInput.inputValue();
  const submittedArtist = await artistInput.inputValue();
  const submittedAlbum = await albumInput.inputValue();
  const submittedCoverImage = await coverImageInput.inputValue();
  const submittedGenres = await page
    .locator('[data-testid^="genre-"]')
    .filter({ hasNot: page.locator('[data-testid="genre-selector"]') })
    .allTextContents();

  expect(submittedTitle).toBe('Edited Track');
  expect(submittedArtist).toBe('Test Artist');
  expect(submittedAlbum).toBe('Test Album');
  expect(submittedCoverImage).toBe('https://example.com/test-cover.jpg');
  expect(submittedGenres).toContain('Jazz');
});
