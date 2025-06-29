// Main export file for gRPC services

// Export types
export * from './types';

// Export endpoints
export * from './endpoints';

// Export constants
export * from './constants';

// Export client
export { MusicServiceClient } from './client';

// Export utilities
export * from './utils';

// Create and export default client instance
import { MusicServiceClient } from './client';

export const musicServiceClient = new MusicServiceClient(); 