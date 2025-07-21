import React, { useState } from 'react';
import Dialog from '@/ui/Dialog';
import DialogContent from '@/ui/DialogContent';
import DialogActions from '@/ui/DialogActions';
import DialogTitle from '@/ui/DialogTitle';
import Button from '@/ui/Button';
import CircularProgress from '@/ui/CircularProgress';
import IconButton from '@/ui/IconButton';
import { uploadFile } from '@/services/api/dropboxService.ts';
import { uploadFileNameToBackend } from '@/services/api/grpc-tracks.ts';
import { useQueryClient } from '@tanstack/react-query';
import { IUploadModal } from './Interface';
import { AsyncResult } from '@/types/types.ts';
import { handleError } from '@/services/api/handleError.ts';
import { ok } from 'neverthrow';
import CloseIcon from '@mui/icons-material/Close';

const UploadModal = ({
  open,
  trackId,
  onClose,
  onUploadSuccess,
}: IUploadModal) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): AsyncResult<void> => {
    if (!file || !trackId) return ok(undefined);

    setIsUploading(true);

    try {
      const ext = file.name.split('.').pop();
      const renamedFile = new File([file], `${trackId}.${ext}`, {
        type: file.type,
      });

      await uploadFile(renamedFile, renamedFile.name);
      await uploadFileNameToBackend(trackId, `${trackId}.${ext}`);
      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
      onUploadSuccess?.();
      onClose();

      return ok(undefined);
    } catch (err) {
      return handleError(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-testid="upload-modal">
      <DialogTitle>
        Upload Audio File
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          data-testid="close-upload-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <input
          type="file"
          accept=".mp3,.wav"
          onChange={handleFileChange}
          data-testid="file-input"
        />
        {file && <p data-testid="selected-file">{file.name}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} data-testid="cancel-upload">
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          variant="contained"
          data-testid="upload-submit"
        >
          {isUploading ? (
            <CircularProgress size={24} data-testid="upload-progress" />
          ) : (
            'Upload'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
