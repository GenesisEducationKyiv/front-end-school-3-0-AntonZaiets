import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { 
  getGenres, 
  getTracks, 
  getTrackBySlug, 
  createTrack, 
  updateTrack, 
  deleteTrack, 
  deleteMultipleTracks,
  saveAudioFile,
  deleteAudioFile,
  getTrackById
} from './utils/db';
import { createSlug } from './utils/slug';
import { updateTracksList, startWSServer } from './ws-server';
import { 
  IGenreService, 
  ITrackService,
  GetAllGenresResponse,
  GetAllTracksResponse,
  GetTrackBySlugResponse,
  CreateTrackResponse,
  UpdateTrackResponse,
  DeleteTrackResponse,
  DeleteMultipleTracksResponse,
  UploadTrackFileResponse,
  DeleteTrackFileResponse
} from './types/grpc';

const PROTO_PATH = path.resolve(__dirname, 'music_service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const musicProto = grpc.loadPackageDefinition(packageDefinition) as any;

const convertTrackToGrpc = (track: any): any => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  album: track.album || '',
  genres: track.genres || [],
  coverImage: track.coverImage || '',
  slug: track.slug,
  audioFile: track.audioFile || ''
});

const genreService: IGenreService = {
  getAllGenres: async (call: any, callback: any) => {
    try {
      const genres = await getGenres();
      const response: GetAllGenresResponse = { 
        genres: genres
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  }
};

const trackService: ITrackService = {
  getAllTracks: async (call: any, callback: any) => {
    try {
      const request = call.request || {};
      
      const page = request.page || 1;
      const limit = request.limit || 10;
      const search = request.search || '';
      const sort = request.sortBy || 'title';
      const sortOrder = request.sortOrder || 'asc';
      const genres = request.genres || [];
      const artist = request.artist || '';
      
      const genre = genres.length > 0 ? genres[0] : '';
      
      const query = { page, limit, search, sort, order: sortOrder, genre, artist };
      
      const { tracks, total } = await getTracks(query);
      const totalPages = Math.ceil(total / limit);
      
      const response: GetAllTracksResponse = {
        tracks: tracks.map(convertTrackToGrpc),
        total,
        page,
        limit,
        totalPages
      };
      
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  getTrackBySlug: async (call: any, callback: any) => {
    try {
      const request = call.request || {};
      const { slug } = request;
      
      if (!slug) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Slug is required'
        });
        return;
      }
      
      const track = await getTrackBySlug(slug);
      
      if (!track) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      
      const response: GetTrackBySlugResponse = { 
        track: convertTrackToGrpc(track)
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  createTrack: async (call: any, callback: any) => {
    try {
      const request = call.request || {};
      const { title, artist, album = "", genres = [], coverImage = "" } = request;
      
      if (!title || !artist) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Title and artist are required'
        });
        return;
      }
      
      if (!genres || !Array.isArray(genres)) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Genres must be an array'
        });
        return;
      }
      
      const slug = createSlug(title);
      
      const existingTrack = await getTrackBySlug(slug);
      if (existingTrack) {
        callback({
          code: grpc.status.ALREADY_EXISTS,
          message: 'A track with this title already exists'
        });
        return;
      }
      
      const newTrack = await createTrack({
        title,
        artist,
        album,
        genres,
        coverImage: coverImage,
        slug
      });
      
      await updateTracksList();
      
      const response: CreateTrackResponse = { 
        track: convertTrackToGrpc(newTrack)
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  updateTrack: async (call: any, callback: any) => {
    try {
      const { id, title, artist, album, genres, coverImage } = call.request;
      
      const existingTrack = await getTrackById(id);
      if (!existingTrack) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      
      const updates: any = { title, artist, album, genres, coverImage: coverImage };
      
      if (title && title !== existingTrack.title) {
        const newSlug = createSlug(title);
        
        const trackWithSameSlug = await getTrackBySlug(newSlug);
        if (trackWithSameSlug && trackWithSameSlug.id !== id) {
          callback({
            code: grpc.status.ALREADY_EXISTS,
            message: 'A track with this title already exists'
          });
          return;
        }
        
        updates.slug = newSlug;
      }
      
      const updatedTrack = await updateTrack(id, updates);
      
      if (!updatedTrack) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      
      const response: UpdateTrackResponse = { 
        track: convertTrackToGrpc(updatedTrack)
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  deleteTrack: async (call: any, callback: any) => {
    try {
      const { id } = call.request;
      
      const success = await deleteTrack(id);
      
      if (!success) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      
      await updateTracksList();
      
      const response: DeleteTrackResponse = { success: true };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  deleteMultipleTracks: async (call: any, callback: any) => {
    try {
      const { ids } = call.request;
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Track IDs are required'
        });
        return;
      }
      
      const results = await deleteMultipleTracks(ids);
      await updateTracksList();
      
      const response: DeleteMultipleTracksResponse = {
        deletedCount: results.success.length,
        notFoundIds: results.failed
      };
      
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  uploadTrackFile: async (call: any, callback: any) => {
    try {
      const { id, audioFile } = call.request;
      const existingTrack = await getTrackById(id);
      if (!existingTrack) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      const updatedTrack = await updateTrack(id, { audioFile });
      if (!updatedTrack) {
        callback({
          code: grpc.status.INTERNAL,
          message: 'Failed to update track'
        });
        return;
      }
      const response: UploadTrackFileResponse = { 
        track: convertTrackToGrpc(updatedTrack)
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  },

  deleteTrackFile: async (call: any, callback: any) => {
    try {
      const { id } = call.request;
      
      const existingTrack = await getTrackById(id);
      if (!existingTrack) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track not found'
        });
        return;
      }
      
      if (!existingTrack.audioFile) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'Track has no audio file'
        });
        return;
      }
      
      const success = await deleteAudioFile(id);
      
      if (!success) {
        callback({
          code: grpc.status.INTERNAL,
          message: 'Failed to delete audio file'
        });
        return;
      }
      
      const updatedTrack = await getTrackById(id);
      
      if (!updatedTrack) {
        callback({
          code: grpc.status.INTERNAL,
          message: 'Failed to get updated track'
        });
        return;
      }
      
      const response: DeleteTrackFileResponse = { 
        track: convertTrackToGrpc(updatedTrack)
      };
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal Server Error'
      });
    }
  }
};

const server = new grpc.Server();

server.addService(musicProto.music.GenreService.service, genreService as any);
server.addService(musicProto.music.TrackService.service, trackService as any);

const PORT = process.env.GRPC_PORT || 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind gRPC server:', err);
    return;
  }

  console.log(`gRPC server running on port ${port}`);

  startWSServer(8082);
});

export { server }; 