import { Track as GrpcTrack } from '../types/grpcTypes';
import { ITrack } from '../../../types/types';

export const convertGrpcTrackToITrack = (grpcTrack: GrpcTrack): ITrack => ({
  id: grpcTrack.id,
  title: grpcTrack.title,
  artist: grpcTrack.artist,
  album: grpcTrack.album || '',
  genres: grpcTrack.genres || [],
  coverImage: grpcTrack.cover_image || '',
  audioFile: grpcTrack.audio_file || '',
});

export const convertGrpcTracksResponse = (grpcResponse: any) => ({
  tracks: grpcResponse.tracks.map(convertGrpcTrackToITrack),
  totalPages: grpcResponse.totalPages,
  currentPage: grpcResponse.page,
}); 