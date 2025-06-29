export const grpcEndpoints = {
  baseUrl: 'http://localhost:8080',
  genreService: {
    getAllGenres: '/music.GenreService/GetAllGenres',
  },
  trackService: {
    getAllTracks: '/music.TrackService/GetAllTracks',
    getTrackBySlug: '/music.TrackService/GetTrackBySlug',
    createTrack: '/music.TrackService/CreateTrack',
    updateTrack: '/music.TrackService/UpdateTrack',
    deleteTrack: '/music.TrackService/DeleteTrack',
    deleteMultipleTracks: '/music.TrackService/DeleteMultipleTracks',
    uploadTrackFile: '/music.TrackService/UploadTrackFile',
    deleteTrackFile: '/music.TrackService/DeleteTrackFile',
  },
  health: '/health',
} as const;

export const buildUrl = (endpoint: string): string => {
  return `${grpcEndpoints.baseUrl}${endpoint}`;
};
