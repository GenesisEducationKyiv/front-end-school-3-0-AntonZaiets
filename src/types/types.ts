import { TrackSchema, TrackPayloadSchema } from '../schemas/trackSchemas.ts';
import { z } from 'zod';
import { Result } from 'neverthrow';

export type ITrack = z.infer<typeof TrackSchema>;
export type TTrackFormData = z.infer<typeof TrackPayloadSchema>;
export type AsyncResult<T> = Promise<Result<T, Error>>;
