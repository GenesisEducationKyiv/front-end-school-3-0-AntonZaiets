import { ok } from 'neverthrow';
import { handleError } from './handleError.ts';
import { AsyncResult, ITrack } from '../../types/types.ts';
import { TApiTrackPayload, TFetchTracksResponse } from './types.ts';
import {
  musicServiceClient,
  convertGrpcTrackToITrack,
  convertGrpcTracksResponse,
  convertGrpcGenresToStrings,
} from '../grpc';

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
      sort_by: sort || 'title',
      sort_order: 'asc',
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
): AsyncResult<ITrack | null> => {
  try {
    const response = await musicServiceClient.getTrackBySlug({ slug });

    if (!response.track) {
      return ok(null);
    }

    const convertedTrack = convertGrpcTrackToITrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};

export const createTrack = async (
  data: TApiTrackPayload
): AsyncResult<ITrack> => {
  try {
    const response = await musicServiceClient.createTrack({
      title: data.title,
      artist: data.artist,
      album: data.album || '',
      genres: data.genres || [],
      cover_image: data.coverImage || '',
    });

    const convertedTrack = convertGrpcTrackToITrack(response.track);

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
      deletedCount: response.deleted_count,
      notFoundIds: response.not_found_ids,
    });
  } catch (e) {
    return handleError(e);
  }
};

export const updateTrack = async (
  id: string,
  data: TApiTrackPayload
): AsyncResult<ITrack> => {
  try {
    const response = await musicServiceClient.updateTrack({
      id,
      title: data.title,
      artist: data.artist,
      album: data.album || '',
      genres: data.genres || [],
      cover_image: data.coverImage || '',
    });

    const convertedTrack = convertGrpcTrackToITrack(response.track);

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

export const deleteTrackFile = async (id: string): AsyncResult<ITrack> => {
  try {
    const response = await musicServiceClient.deleteTrackFile({ id });

    const convertedTrack = convertGrpcTrackToITrack(response.track);

    return ok(convertedTrack);
  } catch (e) {
    return handleError(e);
  }
};
