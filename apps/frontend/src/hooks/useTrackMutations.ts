import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTrack, updateTrack, createTrack, deleteMultipleTracks, deleteTrackFile } from '../services/api/grpc-tracks';
import { TApiTrackPayload } from '../services/api/types.ts';

export const useDeleteTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tracks'] }),
  });
};

export const useDeleteMultipleTracksMutation = ({
  onComplete,
}: {
  onComplete?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMultipleTracks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      onComplete?.();
    },
  });
};

export const useCreateTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrack,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tracks'] }),
  });
};

export const useUpdateTrackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TApiTrackPayload }) =>
      updateTrack(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tracks'] }),
  });
};

export const useDeleteTrackFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrackFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tracks'] }),
  });
};
