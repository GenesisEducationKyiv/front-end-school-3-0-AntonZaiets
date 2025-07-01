import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTracks, createTrack } from '../../src/services/api/tracks';
import axiosInstance from '../../src/services/api/axios/config';
import {
  TrackSchema,
  TrackResponseSchema,
} from '../../src/schemas/trackSchemas';

// Mock axios instance
vi.mock('../../src/services/api/axios/config', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// Mock TrackSchema
vi.mock('../../src/schemas/trackSchemas', () => ({
  TrackSchema: {
    safeParse: vi.fn(),
  },
  TrackResponseSchema: {
    safeParse: vi.fn(),
  },
}));

describe('Tracks Service - White Box Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTracks - Internal Logic', () => {
    it('should call axios with correct parameters', async () => {
      // Arrange
      const mockResponse = {
        data: {
          data: [],
          meta: { totalPages: 0, page: 1 },
        },
      };

      (axiosInstance.get as any).mockResolvedValue(mockResponse);
      (TrackResponseSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      // Act
      await fetchTracks(2, 20, 'artist', { genre: 'Jazz' }, 'search');

      // Assert - тестуємо внутрішні виклики
      expect(axiosInstance.get).toHaveBeenCalledWith('/tracks', {
        params: {
          page: 2,
          limit: 20,
          sort: 'artist',
          genre: 'Jazz',
          search: 'search',
        },
      });
    });

    it('should call TrackResponseSchema.safeParse with response data', async () => {
      // Arrange
      const mockResponse = {
        data: {
          data: [],
          meta: { totalPages: 0, page: 1 },
        },
      };

      (axiosInstance.get as any).mockResolvedValue(mockResponse);
      (TrackResponseSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      // Act
      await fetchTracks(1, 10);

      // Assert - тестуємо внутрішню логіку валідації
      expect(TrackResponseSchema.safeParse).toHaveBeenCalledWith(
        mockResponse.data
      );
    });

    it('should handle validation failure internally', async () => {
      // Arrange
      const mockResponse = {
        data: { invalid: 'data' },
      };

      (axiosInstance.get as any).mockResolvedValue(mockResponse);
      (TrackResponseSchema.safeParse as any).mockReturnValue({
        success: false,
        error: { message: 'Validation failed' },
      });

      // Act
      const result = await fetchTracks(1, 10);

      // Assert - тестуємо внутрішню обробку помилок валідації
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('Validation failed');
      }
      expect(TrackResponseSchema.safeParse).toHaveBeenCalledWith(
        mockResponse.data
      );
    });
  });

  describe('createTrack - Internal Logic', () => {
    it('should call axios.post with correct data', async () => {
      // Arrange
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const mockResponse = {
        data: { id: '123', ...mockTrackData },
      };

      (axiosInstance.post as any).mockResolvedValue(mockResponse);
      (TrackSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      // Act
      await createTrack(mockTrackData);

      // Assert - тестуємо внутрішній виклик axios
      expect(axiosInstance.post).toHaveBeenCalledWith('/tracks', mockTrackData);
    });

    it('should call TrackSchema.safeParse with response data', async () => {
      // Arrange
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const mockResponse = {
        data: { id: '123', ...mockTrackData },
      };

      (axiosInstance.post as any).mockResolvedValue(mockResponse);
      (TrackSchema.safeParse as any).mockReturnValue({
        success: true,
        data: mockResponse.data,
      });

      // Act
      await createTrack(mockTrackData);

      // Assert - тестуємо внутрішню логіку валідації
      expect(TrackSchema.safeParse).toHaveBeenCalledWith(mockResponse.data);
    });

    it('should handle validation errors internally', async () => {
      // Arrange
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const mockResponse = {
        data: { id: '123', ...mockTrackData },
      };

      (axiosInstance.post as any).mockResolvedValue(mockResponse);
      (TrackSchema.safeParse as any).mockReturnValue({
        success: false,
        error: { message: 'Validation error' },
      });

      // Act
      const result = await createTrack(mockTrackData);

      // Assert - тестуємо внутрішню обробку помилок валідації
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('Validation error');
      }
      expect(TrackSchema.safeParse).toHaveBeenCalledWith(mockResponse.data);
    });

    it('should handle axios error internally', async () => {
      // Arrange
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const axiosError = new Error('Bad request');
      (axiosInstance.post as any).mockRejectedValue(axiosError);

      // Act
      const result = await createTrack(mockTrackData);

      // Assert - тестуємо внутрішню обробку помилок axios
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toBe('Bad request');
      }
    });

    it('should handle network error internally', async () => {
      // Arrange
      const mockTrackData = {
        title: 'New Track',
        artist: 'New Artist',
        album: 'New Album',
        genres: ['Pop'],
        coverImage: 'cover.jpg',
      };

      const networkError = new Error('Network error');
      (axiosInstance.post as any).mockRejectedValue(networkError);

      // Act
      const result = await createTrack(mockTrackData);

      // Assert - тестуємо внутрішню обробку мережевих помилок
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain('Network error');
      }
    });
  });
});
