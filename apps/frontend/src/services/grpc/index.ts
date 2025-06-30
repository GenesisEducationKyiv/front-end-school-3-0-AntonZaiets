export * from './types';
export * from './constants';
export * from './adapters';
export * from './client';

import { MusicServiceClient } from './client';

export const musicServiceClient = new MusicServiceClient();
