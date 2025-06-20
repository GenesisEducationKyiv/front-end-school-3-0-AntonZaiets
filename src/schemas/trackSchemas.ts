import { z } from 'zod';

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  genres: z.array(z.string()),
  coverImage: z.string().optional(),
  audioFile: z.string().optional(),
  file: z.unknown().optional(),
});

export const TrackResponseSchema = z.object({
  data: z.array(TrackSchema),
  meta: z.object({
    page: z.number(),
    totalPages: z.number(),
  }),
});

export const TrackPayloadSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  genres: z.array(z.string()),
  coverImage: z.string().optional(),
});
