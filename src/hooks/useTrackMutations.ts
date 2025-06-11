import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTrack, updateTrack, createTrack } from '../services/api/tracks';
import { TApiTrackPayload } from '../services/api/types.ts';
import { showToast } from '../ui/ToastNotification';

export const useDeleteTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      showToast('tracks', 'deleteSuccess');
    },
    onError: () => {
      showToast('tracks', 'deleteError', 'error');
    },
  });
};

export const useDeleteMultipleTracksMutation = ({
  onComplete,
}: {
  onComplete?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deleteTrack(+id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      onComplete?.();
      showToast('tracks', 'deleteSuccess');
    },
    onError: () => {
      showToast('tracks', 'deleteError', 'error');
    },
  });
};

export const useCreateTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      showToast('tracks', 'createSuccess');
    },
    onError: () => {
      showToast('tracks', 'createError', 'error');
    },
  });
};

export const useUpdateTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TApiTrackPayload }) =>
      updateTrack(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      showToast('tracks', 'updateSuccess');
    },
    onError: () => {
      showToast('tracks', 'updateError', 'error');
    },
  });
};
