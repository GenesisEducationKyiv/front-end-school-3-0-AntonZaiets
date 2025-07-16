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

describe('Tracks Service (gRPC) - Black Box', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTracks', () => {
    it('should return tracks and meta info on success', async () => {
      (musicServiceClient.getAllTracks as any).mockResolvedValue({
        grpc: 'response',
      });
      (convertGrpcTracksResponse as any).mockReturnValue({
        tracks: [{ id: '1', title: 'Test Track' }],
        totalPages: 5,
        currentPage: 1,
      });

      const result = await grpcTracks.fetchTracks(
        1,
        10,
        'title',
        { genre: 'Rock' },
        'test'
      );

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual({
          tracks: [{ id: '1', title: 'Test Track' }],
          totalPages: 5,
          currentPage: 1,
        });
      }
    });

    it('should handle empty response', async () => {
      (musicServiceClient.getAllTracks as any).mockResolvedValue({
        grpc: 'response',
      });
      (convertGrpcTracksResponse as any).mockReturnValue({
        tracks: [],
        totalPages: 0,
        currentPage: 1,
      });

      const result = await grpcTracks.fetchTracks(1, 10);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.tracks).toEqual([]);
        expect(result.value.totalPages).toBe(0);
      }
    });

    it('should handle errors from musicServiceClient', async () => {
      (musicServiceClient.getAllTracks as any).mockRejectedValue(
        new Error('gRPC error')
      );
      const result = await grpcTracks.fetchTracks(1, 10);
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('gRPC error');
      }
    });
  });

  describe('createTrack', () => {
    it('should return created track on success', async () => {
      (musicServiceClient.createTrack as any).mockResolvedValue({
        track: { id: '123', title: 'New Track' },
      });
      (convertGrpcTrackToITrack as any).mockReturnValue({
        id: '123',
        title: 'New Track',
      });

      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const result = await grpcTracks.createTrack(mockTrackData);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual({ id: '123', title: 'New Track' });
      }
    });

    it('should handle errors from musicServiceClient', async () => {
      (musicServiceClient.createTrack as any).mockRejectedValue(
        new Error('gRPC create error')
      );
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };
      const result = await grpcTracks.createTrack(mockTrackData);
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('gRPC create error');
      }
    });
  });
});
