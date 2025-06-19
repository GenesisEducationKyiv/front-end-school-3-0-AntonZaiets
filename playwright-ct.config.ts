import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './src/components/TrackForm/__ct__',
  snapshotDir: './__snapshots__',
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'react',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
