import React, { Suspense } from 'react';
import { LazyUploadModal } from '../../../LazyComponents/LazyComponents.tsx';
import { getTemporaryLink } from '../../../../services/api/dropboxService.ts';
import LoadingIndicator from '../../../LoadingIndicator/LoadingIndicator.tsx';

const UploadModalHandler = ({
  showUpload,
  setShowUpload,
  trackId,
  setAudioUrl,
}: {
  showUpload: boolean;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  trackId: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => (
  <Suspense fallback={<LoadingIndicator size={24} />}>
    <LazyUploadModal
      open={showUpload}
      trackId={trackId}
      onClose={() => setShowUpload(false)}
      onUploadSuccess={async () => {
        const tempLink = await getTemporaryLink(`${trackId}.mp3`);
        setAudioUrl(tempLink);
      }}
    />
  </Suspense>
);

export default UploadModalHandler;
