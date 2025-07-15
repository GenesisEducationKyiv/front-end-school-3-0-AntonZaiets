import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTracks, createTrack } from '../../../../src/services/api/tracks';
import axiosInstance from '../../src/services/api/axios/config';
import {
  TrackSchema,
  TrackResponseSchema,
} from '../../src/schemas/trackSchemas';

vi.mock('../../src/services/api/axios/config', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('../../src/schemas/trackSchemas', () => ({
  TrackSchema: {
    safeParse: vi.fn(),
  },
  TrackResponseSchema: {
    safeParse: vi.fn(),
  },
}));

describe('Tracks Service - Black Box Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTracks', () => {
    it('should fetch tracks with pagination and filters', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: '1',
              title: 'Test Track',
              artist: 'Test Artist',
              album: 'Test Album',
              genres: ['Rock'],
              coverImage: 'test.jpg',
            },
          ],
          meta: {
            totalPages: 5,
            page: 1,
          },
        },
      };

      (axiosInstance.get as any).mockResolvedValue(mockResponse);
      (TrackResponseSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      const result = await fetchTracks(
        1,
        10,
        'title',
        { genre: 'Rock' },
        'test'
      );

      expect(result.isOk()).toBe(true);
      expect((result as any).value).toEqual({
        tracks: mockResponse.data.data,
        totalPages: 5,
        currentPage: 1,
      });
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: {
            totalPages: 0,
            page: 1,
          },
        },
      };

      (axiosInstance.get as any).mockResolvedValue(mockResponse);
      (TrackResponseSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      const result = await fetchTracks(1, 10);

      expect(result.isOk()).toBe(true);
      expect((result as any).value.tracks).toEqual([]);
      expect((result as any).value.totalPages).toBe(0);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network error';
      (axiosInstance.get as any).mockRejectedValue(new Error(errorMessage));

      const result = await fetchTracks(1, 10);

      expect(result.isErr()).toBe(true);
      expect((result as any).error.message).toContain(errorMessage);
    });
  });

  describe('createTrack', () => {
    it('should create a track successfully', async () => {
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const mockResponse = {
        data: {
          id: '123',
          ...mockTrackData,
        },
      };

      (axiosInstance.post as any).mockResolvedValue(mockResponse);
      (TrackSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      const result = await createTrack(mockTrackData);

      expect(result.isOk()).toBe(true);
      expect((result as any).value).toEqual(mockResponse.data);
    });

    it('should handle API errors during creation', async () => {
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const errorMessage = 'Creation failed';
      (axiosInstance.post as any).mockRejectedValue(new Error(errorMessage));

      const result = await createTrack(mockTrackData);

      expect(result.isErr()).toBe(true);
      expect((result as any).error.message).toContain(errorMessage);
    });
  });
});
