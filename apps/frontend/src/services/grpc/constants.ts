// gRPC service constants

export const GRPC_SERVICES = {
  GENRE_SERVICE: 'music.GenreService',
  TRACK_SERVICE: 'music.TrackService',
} as const;

export const GRPC_METHODS = {
  GENRE: {
    GET_ALL_GENRES: 'GetAllGenres',
  },
  TRACK: {
    GET_ALL_TRACKS: 'GetAllTracks',
    GET_TRACK_BY_SLUG: 'GetTrackBySlug',
    CREATE_TRACK: 'CreateTrack',
    UPDATE_TRACK: 'UpdateTrack',
    DELETE_TRACK: 'DeleteTrack',
    DELETE_MULTIPLE_TRACKS: 'DeleteMultipleTracks',
    UPLOAD_TRACK_FILE: 'UploadTrackFile',
    DELETE_TRACK_FILE: 'DeleteTrackFile',
  },
} as const;

export const DEFAULT_GRPC_HOST = 'http://localhost:8080';

export const GRPC_HEADERS = {
  'Content-Type': 'application/json',
} as const; 