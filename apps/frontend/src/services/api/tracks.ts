import axiosInstance from './axios/config.ts';
import { AxiosResponse } from 'axios';
import { ok } from 'neverthrow';
import { handleError } from './handleError.ts';
import { apiEndpoints } from './apiEndpoints.ts';
import { AsyncResult, ITrack } from '../../types/types.ts';
import {
  TrackSchema,
  TrackResponseSchema,
} from '../../schemas/trackSchemas.ts';
import { TApiTrackPayload, TFetchTracksResponse } from './types.ts';

export const fetchGenres = async (): AsyncResult<string[]> => {
  try {
    const res: AxiosResponse<string[]> = await axiosInstance.get(
      apiEndpoints.genres
    );
    return ok(res.data);
  } catch (e) {
    return handleError(e);
  }
};

export const fetchTracks = async (
  page = 1,
  limit = 10,
  sort = 'title',
  filter: Record<string, string> = {},
  search = ''
): AsyncResult<TFetchTracksResponse> => {
  try {
    const res = await axiosInstance.get(apiEndpoints.tracks, {
      params: { page, limit, sort, search, ...filter },
    });

    const parsed = TrackResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      return handleError(
        new Error(`Invalid tracks response: ${parsed.error.message}`)
      );
    }

    return ok({
      tracks: parsed.data.data,
      totalPages: parsed.data.meta.totalPages,
      currentPage: parsed.data.meta.page,
    });
  } catch (e) {
    return handleError(e);
  }
};

export const createTrack = async (
  data: TApiTrackPayload
): AsyncResult<ITrack> => {
  try {
    const res = await axiosInstance.post(apiEndpoints.tracks, data);
    const parsed = TrackSchema.safeParse(res.data);
    return parsed.success
      ? ok(parsed.data)
      : handleError(new Error(parsed.error.message));
  } catch (e) {
    return handleError(e);
  }
};

export const deleteTrack = async (id: string): AsyncResult<void> => {
  try {
    await axiosInstance.delete(apiEndpoints.track(id));
    return ok(undefined);
  } catch (e) {
    return handleError(e);
  }
};

export const updateTrack = async (
  id: string,
  data: TApiTrackPayload
): AsyncResult<ITrack> => {
  try {
    const res = await axiosInstance.put(apiEndpoints.track(id), data);
    const parsed = TrackSchema.safeParse(res.data);
    return parsed.success
      ? ok(parsed.data)
      : handleError(new Error(parsed.error.message));
  } catch (e) {
    return handleError(e);
  }
};

export const uploadFileNameToBackend = async (
  id: string,
  audioUrl: string
): AsyncResult<void> => {
  try {
    const blob = new Blob([audioUrl], { type: 'audio/mp3' });
    const file = new File([blob], 'cloudinary-audio-link.mp3', {
      type: 'audio/mp3',
    });

    const formData = new FormData();
    formData.append('file', file);

    await axiosInstance.post(apiEndpoints.upload(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return ok(undefined);
  } catch (e) {
    return handleError(e);
  }
};
