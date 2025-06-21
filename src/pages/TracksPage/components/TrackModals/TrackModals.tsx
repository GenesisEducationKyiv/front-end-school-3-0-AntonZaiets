import useTrackPageStore from '../../../../stores/trackPageStore.ts';
import {
  useTracksQuery,
  useGenresQuery,
  useCreateTrackMutation,
  useUpdateTrackMutation,
  useDeleteTrackMutation,
  useDeleteMultipleTracksMutation,
  useDebounce,
} from '../../../../hooks';
import TrackForm from '../../../../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';

const TrackModals = () => {
  const {
    isModalOpen,
    closeModal,
    editingTrackId,
    deletingTrackId,
    setDeletingTrackId,
    isBulkConfirmOpen,
    setIsBulkConfirmOpen,
    selectedTracks,
    resetSelection,
    page,
    sort,
    filter,
    searchTerm,
  } = useTrackPageStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: tracksData, isLoading } = useTracksQuery({
    page,
    limit: 10,
    sort,
    filter,
    search: debouncedSearchTerm,
  });
  const { data: genres } = useGenresQuery();
  const createTrackMutation = useCreateTrackMutation();
  const updateTrackMutation = useUpdateTrackMutation();
  const deleteMutation = useDeleteTrackMutation();
  const deleteMultipleMutation = useDeleteMultipleTracksMutation({
    onComplete: resetSelection,
  });

  const editingTrack =
    tracksData && 'tracks' in tracksData
      ? tracksData.tracks.find((t) => t.id === editingTrackId)
      : undefined;

  return (
    <>
      {isModalOpen && (
        <TrackForm
          data-testid="track-form-modal"
          open={isModalOpen}
          onClose={closeModal}
          onSubmit={(formData) => {
            if (editingTrackId) {
              updateTrackMutation.mutate({
                id: editingTrackId,
                data: formData,
              });
            } else {
              createTrackMutation.mutate(formData);
            }
            closeModal();
          }}
          track={editingTrack}
          genres={genres || []}
        />
      )}
      <ConfirmDialog
        data-testid="confirm-delete-dialog"
        open={!!deletingTrackId}
        onClose={() => setDeletingTrackId(null)}
        onConfirm={() => {
          if (deletingTrackId) {
            deleteMutation.mutate(deletingTrackId);
            setDeletingTrackId(null);
          }
        }}
        title="Delete Track"
        message="Are you sure you want to delete this track?"
      />
      <ConfirmDialog
        data-testid="confirm-bulk-delete-dialog"
        open={isBulkConfirmOpen}
        onClose={() => setIsBulkConfirmOpen(false)}
        onConfirm={() => deleteMultipleMutation.mutate(selectedTracks)}
        title="Delete Selected Tracks"
        message="Are you sure you want to delete the selected tracks?"
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export default TrackModals;
