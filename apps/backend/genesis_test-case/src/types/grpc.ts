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
  artist?: string;
}

export interface GetAllTracksResponse {
  tracks: Track[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetTrackBySlugResponse {
  track?: Track;
}

export interface CreateTrackResponse {
  track: Track;
}

export interface UpdateTrackResponse {
  track: Track;
}

export interface DeleteTrackResponse {
  success: boolean;
}

export interface DeleteMultipleTracksResponse {
  deleted_count: number;
  not_found_ids: string[];
}

export interface UploadTrackFileResponse {
  track: Track;
}

export interface DeleteTrackFileResponse {
  track: Track;
}

export interface IGenreService {
  getAllGenres(call: any, callback: any): void;
}

export interface ITrackService {
  getAllTracks(call: any, callback: any): void;
  getTrackBySlug(call: any, callback: any): void;
  createTrack(call: any, callback: any): void;
  updateTrack(call: any, callback: any): void;
  deleteTrack(call: any, callback: any): void;
  deleteMultipleTracks(call: any, callback: any): void;
  uploadTrackFile(call: any, callback: any): void;
  deleteTrackFile(call: any, callback: any): void;
} 