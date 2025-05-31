import { TrackSchema } from '../schemas/trackSchemas.ts'
import { z } from 'zod'

export type ITrack = z.infer<typeof TrackSchema>;

export interface TTrackFormData {
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    coverImage?: string;
}
