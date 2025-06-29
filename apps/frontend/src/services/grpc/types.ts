export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  cover_image: string;
  slug: string;
  audio_file: string;
}

export interface GetAllGenresRequest {}
export interface GetAllGenresResponse {
  genres: string[];
}

export interface GetAllTracksRequest {
  page?: number;
  limit?: number;
  search?: string;
  genres?: string[];
  sort_by?: string;
  sort_order?: string;
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

export interface CreateTrackRequest {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  cover_image?: string;
}

export interface CreateTrackResponse {
  track: Track;
}

export interface UpdateTrackRequest {
  id: string;
  title?: string;
  artist?: string;
  album?: string;
  genres?: string[];
  cover_image?: string;
}

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
  deleted_count: number;
  not_found_ids: string[];
}

export interface UploadTrackFileRequest {
  id: string;
  filename: string;
  data: Uint8Array;
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
