import { BaseTrack } from '../../../types/types.ts';

export type Track = Omit<BaseTrack, 'file'> & { slug: string };

export type GetAllGenresRequest = Record<string, never>;

export interface GetAllGenresResponse {
  genres: string[];
}

export interface GetAllTracksRequest {
  page?: number;
  limit?: number;
  search?: string;
  genres?: string[];
  sortBy?: string;
  sortOrder?: string;
  artist?: string;
}

export interface GetAllTracksResponse {
  tracks: Track[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetTrackBySlugRequest {
  slug: string;
}

export interface GetTrackBySlugResponse {
  track?: Track;
}

export type CreateTrackRequest = Pick<
  BaseTrack,
  'title' | 'artist' | 'album' | 'genres' | 'coverImage'
>;
export type TrackPayload = CreateTrackRequest;

export interface CreateTrackResponse {
  track: Track;
}

export type UpdateTrackRequest = { id: string } & Partial<CreateTrackRequest>;

export interface UpdateTrackResponse {
  track: Track;
}

export interface DeleteTrackRequest {
  id: string;
}

export interface DeleteTrackResponse {
  success: boolean;
}

export interface DeleteMultipleTracksRequest {
  ids: string[];
}

export interface DeleteMultipleTracksResponse {
  deletedCount: number;
  notFoundIds: string[];
}

export interface UploadTrackFileRequest {
  id: string;
  audioFile: string;
}

export interface UploadTrackFileResponse {
  track: Track;
}

export interface DeleteTrackFileRequest {
  id: string;
}

export interface DeleteTrackFileResponse {
  track: Track;
}
