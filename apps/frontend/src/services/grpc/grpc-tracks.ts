import { ok } from 'neverthrow';
import { handleError } from '../api/handleError.ts';
import { AsyncResult } from '../../types/types.ts';
import { TrackFormData, TFetchTracksResponse } from '../../types/types.ts';
import {
  musicServiceClient,
  convertGrpcTrackToBaseTrack,
  convertGrpcTracksResponse,
  convertGrpcGenresToStrings,
} from './index.ts';

export const fetchGenres = async (): AsyncResult<string[]> => {
  try {
    const response = await musicServiceClient.getAllGenres({});
    const genres = convertGrpcGenresToStrings(response);
    return ok(genres);
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
    const response = await musicServiceClient.getAllTracks({
      page,
      limit,
      search: search || '',
      sortBy: sort || 'title',
      sortOrder: 'asc',
      genres: filter.genre ? [filter.genre] : [],
      ...(filter.artist ? { artist: filter.artist } : {}),
    });

    const convertedResponse = convertGrpcTracksResponse(response);

    return ok(convertedResponse);
  } catch (e) {
    return handleError(e);
  }
};

export const fetchTrackBySlug = async (
  slug: string
): AsyncResult<any | null> => {
  try {
    const response = await musicServiceClient.getTrackBySlug({ slug });

    if (!response.track) {
      return ok(null);
    }

    const convertedTrack = convertGrpcTrackToBaseTrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};

export const createTrack = async (data: TrackFormData): AsyncResult<any> => {
  try {
    const response = await musicServiceClient.createTrack({
      title: data.title,
      artist: data.artist,
      album: data.album || '',
      genres: data.genres || [],
      coverImage: data.coverImage || '',
    });

    const convertedTrack = convertGrpcTrackToBaseTrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};

export const deleteTrack = async (id: string): AsyncResult<void> => {
  try {
    await musicServiceClient.deleteTrack({ id });
    return ok(undefined);
  } catch (e) {
    return handleError(e);
  }
};

export const deleteMultipleTracks = async (
  ids: string[]
): AsyncResult<{ deletedCount: number; notFoundIds: string[] }> => {
  try {
    const response = await musicServiceClient.deleteMultipleTracks({ ids });
    return ok({
      deletedCount: response.deletedCount,
      notFoundIds: response.notFoundIds,
    });
  } catch (e) {
    return handleError(e);
  }
};

export const updateTrack = async (
  id: string,
  data: TrackFormData
): AsyncResult<any> => {
  try {
    const response = await musicServiceClient.updateTrack({
      id,
      title: data.title,
      artist: data.artist,
      album: data.album || '',
      genres: data.genres || [],
      coverImage: data.coverImage || '',
    });

    const convertedTrack = convertGrpcTrackToBaseTrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};

export const uploadFileNameToBackend = async (
  id: string,
  audioUrl: string
): AsyncResult<void> => {
  try {
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await musicServiceClient.uploadTrackFile({
      id,
      filename: 'audio.mp3',
      data: uint8Array,
    });

    return ok(undefined);
  } catch (e) {
    return handleError(e);
  }
};

export const deleteTrackFile = async (id: string): AsyncResult<any> => {
  try {
    const response = await musicServiceClient.deleteTrackFile({ id });

    const convertedTrack = convertGrpcTrackToBaseTrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};
