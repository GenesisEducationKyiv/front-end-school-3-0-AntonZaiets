import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTracks, createTrack } from '../tracks.ts';
import axiosInstance from '../axios/config.ts';
import {
  TrackSchema,
  TrackResponseSchema,
} from '../../../schemas/trackSchemas.ts';

vi.mock('../axios/config', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('../../../schemas/trackSchemas', () => ({
  TrackSchema: {
    safeParse: vi.fn(),
  },
  TrackResponseSchema: {
    safeParse: vi.fn(),
  },
}));

describe('Tracks Service', () => {
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
      if (result.isOk()) {
        expect(result.value).toEqual({
          tracks: mockResponse.data.data,
          totalPages: 5,
          currentPage: 1,
        });
      }
      expect(axiosInstance.get).toHaveBeenCalledWith('/tracks', {
        params: {
          page: 1,
          limit: 10,
          sort: 'title',
          genre: 'Rock',
          search: 'test',
        },
      });
    });
  });

  describe('createTrack', () => {
    it('should create a track and validate response', async () => {
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
      if (result.isOk()) {
        expect(result.value).toEqual(mockResponse.data);
      }
      expect(axiosInstance.post).toHaveBeenCalledWith('/tracks', mockTrackData);
      expect(TrackSchema.safeParse).toHaveBeenCalledWith(mockResponse.data);
    });

    it('should handle validation errors', async () => {
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
        success: false,
        error: { message: 'Validation error' },
      });

      const result = await createTrack(mockTrackData);

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('Validation error');
      }
    });
  });
});
