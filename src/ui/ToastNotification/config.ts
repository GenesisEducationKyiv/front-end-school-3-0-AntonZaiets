export const toastMessages = {
  tracks: {
    deleteSuccess: 'Deleted successfully!',
    deleteError: 'Failed to delete',
    createSuccess: 'Created successfully!',
    createError: 'Failed to create',
    updateSuccess: 'Updated successfully!',
    updateError: 'Failed to update',
    uploadSuccess: 'Uploaded successfully!',
    uploadError: 'Failed to upload',
  },
  general: {
    networkError: 'Network error. Please try again.',
    unexpectedError: 'An unexpected error occurred.',
  },
};

export const toastOptions = {
  default: {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
  },
  persistent: {
    position: 'top-center',
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    theme: 'dark',
  },
};
