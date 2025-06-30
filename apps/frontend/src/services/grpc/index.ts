export * from './types';
export * from './constants';
export { MusicServiceClient } from './client';
export * from './utils';

import { MusicServiceClient } from './client';

export const musicServiceClient = new MusicServiceClient();
