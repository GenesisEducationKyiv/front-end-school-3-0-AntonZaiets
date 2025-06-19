import { test, expect } from '@playwright/experimental-ct-react';
import { TrackFormStory } from '../__stories__/TrackFormStory';

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

  await expect(page.getByTestId('input-title')).toBeVisible();
  await expect(page.getByTestId('input-artist')).toBeVisible();
  await expect(page.getByTestId('input-album')).toBeVisible();
  await expect(page.getByTestId('input-cover-image')).toBeVisible();
  await expect(page.getByTestId('genre-selector')).toBeVisible();
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

  await page.getByTestId('input-title').fill('New Track');
  await page.getByTestId('input-artist').fill('New Artist');
  await page.getByTestId('input-album').fill('New Album');
  await page
    .getByTestId('input-cover-image')
    .fill('https://example.com/new-cover.jpg');

  // Select genres
  const genreInput = await page.getByTestId('genre-selector').locator('input');
  await genreInput.fill('Rock');
  await page.getByText('Rock').click();
  await genreInput.fill('Pop');
  await page.getByText('Pop').click();

  await page.getByTestId('submit-button').click();

  await expect.poll(() => submittedData).not.toBeNull();
  await expect(submittedData).toMatchObject({
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

  await page.getByTestId('cancel-button').click();
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

  await expect(page.getByTestId('input-title')).toHaveValue('Test Track');
  await expect(page.getByTestId('input-artist')).toHaveValue('Test Artist');
  await expect(page.getByTestId('input-album')).toHaveValue('Test Album');
  await expect(page.getByTestId('input-cover-image')).toHaveValue(
    'https://example.com/test-cover.jpg'
  );

  await page.getByTestId('input-title').fill('Edited Track');
  await expect(page.getByTestId('input-title')).toHaveValue('Edited Track');

  // Клік по модалці для втрати фокусу
  await page.getByTestId('track-form-modal').click();

  // Видалити жанр Pop (клік по кнопці видалення Chip)
  const popDeleteBtn = await page
    .getByTestId('genre-Pop')
    .locator('svg')
    .first();
  await popDeleteBtn.click();

  // Додати Jazz
  await page.getByTestId('genre-selector').locator('input').fill('Jazz');
  await page.getByText('Jazz').click();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('genre-Jazz')).toBeVisible();

  // Сабміт
  await page.getByTestId('submit-button').click();

  // Перевірка на відсутність валідаційних помилок
  await expect(page.locator('text=required')).toHaveCount(0);
  await expect(page.locator('text=Select at least one genre')).toHaveCount(0);

  // Extract form values from the DOM after submit
  const submittedData = await page.evaluate(() => {
    const title = (
      document.querySelector('[data-testid="input-title"]') as HTMLInputElement
    )?.value;
    const artist = (
      document.querySelector('[data-testid="input-artist"]') as HTMLInputElement
    )?.value;
    const album = (
      document.querySelector('[data-testid="input-album"]') as HTMLInputElement
    )?.value;
    const coverImage = (
      document.querySelector(
        '[data-testid="input-cover-image"]'
      ) as HTMLInputElement
    )?.value;
    const genres = Array.from(
      document.querySelectorAll('[data-testid^="genre-"]')
    )
      .map((el) => el.getAttribute('data-testid')?.replace('genre-', ''))
      .filter((g) => g && g !== 'selector');
    return { title, artist, album, coverImage, genres };
  });
  await expect(submittedData.title).toBe('Edited Track');
  await expect(submittedData.genres).toContain('Jazz');
});
