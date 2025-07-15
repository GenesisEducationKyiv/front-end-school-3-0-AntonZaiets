interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEV_MODE: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_SOURCE_MAPS: string;
  readonly VITE_ENABLE_BUNDLE_ANALYZER: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
