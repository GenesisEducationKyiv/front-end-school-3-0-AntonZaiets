import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as grpcTracks from '../../src/services/api/grpc-tracks';
import {
  musicServiceClient,
  convertGrpcTracksResponse,
  convertGrpcTrackToITrack,
} from '../../src/services/grpc';

vi.mock('../../src/services/grpc', () => ({
  musicServiceClient: {
    getAllTracks: vi.fn(),
    createTrack: vi.fn(),
  },
  convertGrpcTracksResponse: vi.fn(),
  convertGrpcTrackToITrack: vi.fn(),
}));

describe('Tracks Service (gRPC) - White Box', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTracks', () => {
    it('should call musicServiceClient.getAllTracks with correct params', async () => {
      (musicServiceClient.getAllTracks as any).mockResolvedValue({
        grpc: 'response',
      });
      (convertGrpcTracksResponse as any).mockReturnValue({
        tracks: [],
        totalPages: 1,
        currentPage: 1,
      });

      await grpcTracks.fetchTracks(
        2,
        20,
        'artist',
        { genre: 'Jazz' },
        'search'
      );

      expect(musicServiceClient.getAllTracks).toHaveBeenCalledWith({
        page: 2,
        limit: 20,
        search: 'search',
        sort_by: 'artist',
        sort_order: 'asc',
        genres: ['Jazz'],
      });
      expect(convertGrpcTracksResponse).toHaveBeenCalledWith({
        grpc: 'response',
      });
    });

    it('should handle errors from musicServiceClient', async () => {
      (musicServiceClient.getAllTracks as any).mockRejectedValue(
        new Error('gRPC error')
      );

      const result = await grpcTracks.fetchTracks();

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('gRPC error');
      }
    });
  });

  describe('createTrack', () => {
    it('should call musicServiceClient.createTrack with correct data', async () => {
      (musicServiceClient.createTrack as any).mockResolvedValue({
        track: { id: '1', title: 'Test' },
      });
      (convertGrpcTrackToITrack as any).mockReturnValue({
        id: '1',
        title: 'Test',
      });

      const data = {
        title: 'Test',
        artist: 'A',
        album: '',
        genres: [],
        coverImage: '',
      };
      const result = await grpcTracks.createTrack(data);

      expect(musicServiceClient.createTrack).toHaveBeenCalledWith({
        title: 'Test',
        artist: 'A',
        album: '',
        genres: [],
        cover_image: '',
      });
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual({ id: '1', title: 'Test' });
      }
    });

    it('should handle errors from musicServiceClient', async () => {
      (musicServiceClient.createTrack as any).mockRejectedValue(
        new Error('gRPC create error')
      );
      const data = {
        title: 'Test',
        artist: 'A',
        album: '',
        genres: [],
        coverImage: '',
      };
      const result = await grpcTracks.createTrack(data);
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('gRPC create error');
      }
    });
  });
});
