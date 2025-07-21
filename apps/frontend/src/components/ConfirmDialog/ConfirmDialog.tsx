import React from 'react';
import DialogContentText from '@/ui/DialogContentText.tsx';
import Dialog from '@/ui/Dialog.tsx';
import DialogTitle from '@/ui/DialogTitle.tsx';
import DialogContent from '@/ui/DialogContent.tsx';
import Button from '@/ui/Button.tsx';
import DialogActions from '@/ui/DialogActions.tsx';
import { IConfirmDialog } from './Interface';

const ConfirmDialog = React.memo<IConfirmDialog>(({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog open={open} onClose={onClose} data-testid="confirm-dialog">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="cancel-delete">
          {cancelText}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          data-testid="confirm-delete"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
