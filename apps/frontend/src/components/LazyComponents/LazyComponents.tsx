import { lazy } from 'react';

export const LazyUploadModal = lazy(
  () => import('../UploadModal/UploadModal.tsx')
);
export const LazyConfirmDialog = lazy(
  () => import('../ConfirmDialog/ConfirmDialog.tsx')
);
export const LazyTrackAudioPlayer = lazy(
  () => import('../TrackItem/components/TrackAudioPlayer/TrackAudioPlayer.tsx')
);

export const LazyTracksPage = lazy(
  () => import('../../pages/TracksPage/TracksPage.tsx')
);
