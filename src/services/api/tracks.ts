import axiosInstance from './axios/config.ts';
import { AxiosResponse } from 'axios';
import { Result, ok } from 'neverthrow';
import { handleError } from './handleError.ts';
import { apiEndpoints } from './apiEndpoints.ts';
import { ITrack } from '../../types/types.ts';
import { TrackSchema, TrackResponseSchema } from "../../schemas/trackSchemas.ts";
import { TApiTrackPayload, TFetchTracksResponse } from "./types.ts";

export const fetchGenres = async (): Promise<Result<string[], Error>> => {
    try {
        const res: AxiosResponse<string[]> = await axiosInstance.get(apiEndpoints.genres);
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
): Promise<Result<TFetchTracksResponse, Error>> => {
    try {
        const res = await axiosInstance.get(apiEndpoints.tracks, {
            params: { page, limit, sort, search, ...filter },
        });

        const parsed = TrackResponseSchema.safeParse(res.data);
        if (!parsed.success) {
            return handleError(new Error(`Invalid tracks response: ${parsed.error.message}`));
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

export const createTrack = async (data: TApiTrackPayload): Promise<Result<ITrack, Error>> => {
    try {
        const res = await axiosInstance.post(apiEndpoints.tracks, data);
        const parsed = TrackSchema.safeParse(res.data);
        return parsed.success ? ok(parsed.data) : handleError(new Error(parsed.error.message));
    } catch (e) {
        return handleError(e);
    }
};

export const deleteTrack = async (id: number): Promise<Result<void, Error>> => {
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
): Promise<Result<ITrack, Error>> => {
    try {
        const res = await axiosInstance.put(apiEndpoints.track(id), data);
        const parsed = TrackSchema.safeParse(res.data);
        return parsed.success ? ok(parsed.data) : handleError(new Error(parsed.error.message));
    } catch (e) {
        return handleError(e);
    }
};

export const uploadFileNameToBackend = async (
    id: string,
    audioUrl: string
): Promise<Result<void, Error>> => {
    try {
        const blob = new Blob([audioUrl], { type: 'audio/mp3' });
        const file = new File([blob], 'cloudinary-audio-link.mp3', { type: 'audio/mp3' });

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






















/*
import { AxiosResponse } from 'axios';
import axiosInstance from './axios/config.ts';
import { ITrack } from '../../types/types.ts';
import { TrackResponseSchema, TrackSchema } from "../../schemas/trackSchemas.ts";
import { Result, ok, err } from 'neverthrow';
import { TApiTrackPayload, TFetchTracksResponse } from "./types.ts";

export const fetchGenres = async (): Promise<Result<string[], Error>> => {
    try {
        const response: AxiosResponse<string[]> = await axiosInstance.get('/genres');
        return ok(response.data);
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

export const fetchTracks = async (
    page = 1,
    limit = 10,
    sort = 'title',
    filter: Record<string, string> = {},
    search = ''
): Promise<Result<TFetchTracksResponse, Error>> => {
    try {
        const response = await axiosInstance.get('/tracks', {
            params: { page, limit, sort, search, ...filter },
        });

        const parsed = TrackResponseSchema.safeParse(response.data);
        if (!parsed.success) {
            return err(new Error(`Invalid tracks response: ${parsed.error.message}`));
        }

        return ok({
            tracks: parsed.data.data,
            totalPages: parsed.data.meta.totalPages,
            currentPage: parsed.data.meta.page,
        });
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

export const createTrack = async (trackData: TApiTrackPayload): Promise<Result<ITrack, Error>> => {
    try {
        const response = await axiosInstance.post('/tracks', trackData);
        const parsed = TrackSchema.safeParse(response.data);
        if (!parsed.success) {
            return err(new Error(`Invalid create track response: ${parsed.error.message}`));
        }

        return ok(parsed.data);
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

export const deleteTrack = async (id: number): Promise<Result<void, Error>> => {
    try {
        await axiosInstance.delete(`/tracks/${id}`);
        return ok(undefined);
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

export const updateTrack = async (
    trackId: string,
    trackData: TApiTrackPayload
): Promise<Result<ITrack, Error>> => {
    try {
        const response = await axiosInstance.put(`/tracks/${trackId}`, trackData);
        const parsed = TrackSchema.safeParse(response.data);
        if (!parsed.success) {
            return err(new Error(`Invalid update track response: ${parsed.error.message}`));
        }

        return ok(parsed.data);
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

export const uploadFileNameToBackend = async (
    trackId: string,
    audioUrl: string
): Promise<Result<void, Error>> => {
    try {
        const blob = new Blob([audioUrl], { type: 'audio/mp3' });
        const file = new File([blob], 'cloudinary-audio-link.mp3', { type: 'audio/mp3' });

        const formData = new FormData();
        formData.append('file', file);

        await axiosInstance.post(`/tracks/${trackId}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return ok(undefined);
    } catch (error) {
        if (error instanceof Error) return err(error);
        return err(new Error('Unknown error occurred'));
    }
};

*/
