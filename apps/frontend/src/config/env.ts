export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8003/api',
    dropboxAppKey: import.meta.env.VITE_ACCESS_TOKEN || '',
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Music Track App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  // Development Configuration
  dev: {
    mode: import.meta.env.VITE_DEV_MODE === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },

  // Production Configuration
  production: {
    enableSourceMaps: import.meta.env.VITE_ENABLE_SOURCE_MAPS === 'true',
    enableBundleAnalyzer:
      import.meta.env.VITE_ENABLE_BUNDLE_ANALYZER === 'true',
  },
} as const;

export type Config = typeof config;
