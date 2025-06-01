const BASE = '/tracks';

export const apiEndpoints = {
  genres: '/genres',
  tracks: BASE,
  track: (id: string) => `${BASE}/${id}`,
  upload: (id: string) => `${BASE}/${id}/upload`,
};
