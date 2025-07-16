import { Track as GrpcTrack } from '../types/grpcTypes';
import { BaseTrack } from '../../../types/types.ts';

export const convertGrpcTrackToBaseTrack = (
  grpcTrack: GrpcTrack
): BaseTrack => ({
  id: grpcTrack.id,
  title: grpcTrack.title,
  artist: grpcTrack.artist,
  album: grpcTrack.album || '',
  genres: grpcTrack.genres || [],
  coverImage: grpcTrack.coverImage || '',
  audioFile: grpcTrack.audioFile || '',
  slug: grpcTrack.slug,
});

export const convertGrpcTracksResponse = (grpcResponse: any) => ({
  tracks: grpcResponse.tracks.map(convertGrpcTrackToBaseTrack),
  totalPages: grpcResponse.totalPages,
  currentPage: grpcResponse.page,
});
