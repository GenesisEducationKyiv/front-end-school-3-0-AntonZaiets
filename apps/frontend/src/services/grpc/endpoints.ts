// gRPC service endpoints configuration

export const grpcEndpoints = {
  // Base URL for gRPC-Web proxy
  baseUrl: 'http://localhost:8080',
  
  // Genre Service endpoints
  genreService: {
    getAllGenres: '/music.GenreService/GetAllGenres',
  },
  
  // Track Service endpoints
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
  
  // Health check endpoint
  health: '/health',
} as const;

// Helper function to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${grpcEndpoints.baseUrl}${endpoint}`;
}; 