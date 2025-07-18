# Music Track App

A modern React application for managing music tracks with advanced optimization features and real-time WebSocket communication.

## Features

### Core Functionality
- **Track Management**: Create, edit, delete, and view music tracks
- **Bulk Operations**: Select and delete multiple tracks efficiently
- **Audio Upload**: Upload audio files with Dropbox integration
- **Audio Player**: Built-in audio player for track preview
- **Search & Filter**: Advanced search and filtering capabilities
- **Real-time Updates**: WebSocket connection for live updates
- **Pagination**: Custom pagination for large datasets

### Performance Optimizations
- **Bundle Analysis**: Integrated bundle analyzer for performance monitoring
- **Code Splitting**: Lazy loading for heavy components (modals, audio player)
- **Tree Shaking**: Automatic removal of unused code
- **Source Maps**: Development-friendly debugging with source maps
- **Dynamic Imports**: Components loaded only when needed
- **Windows Optimization**: Special optimizations for Windows file system

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front-end-school-3-0-AntonZaiets
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp apps/frontend/env.example apps/frontend/.env
```

4. Configure your `.env` file.

### Development

Start the project:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or next available port)

### Building

Build for production:
```bash
npm run build --workspace=apps/frontend
```

Analyze bundle size:
```bash
npm run build:analyze --workspace=apps/frontend
```

This will generate a bundle analysis report at `dist/stats.html`

## Performance Features

### Bundle Optimization
- **Automatic Code Splitting**: Vite automatically splits vendor and feature chunks
- **Lazy Loading**: Heavy components loaded on demand
- **Tree Shaking**: Unused code automatically removed
- **Minification**: Production builds are minified and optimized
- **Windows Optimization**: `maxParallelFileOps: 1` to prevent EMFILE errors

### Code Splitting Strategy
- **Vendor Chunks**: React, MUI, Router, Query libraries
- **Feature Chunks**: Modals, audio player, forms
- **Page Chunks**: Route-based code splitting

### Lazy Loading Components
- Upload Modal: Loaded only when user clicks upload
- Confirm Dialog: Loaded only when confirmation needed
- Audio Player: Loaded only when track has audio
- Pages: Loaded only when navigating

### Key Technologies
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Vite 6**: Fast build tool with HMR
- **Material-UI 7**: Modern UI components
- **React Query**: Server state management
- **React Router**: Client-side routing
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **Axios**: HTTP client
- **Dropbox API**: File storage
- **WebSocket**: Real-time communication

## Performance Monitoring

### Bundle Analysis
Run `npm run build:analyze --workspace=apps/frontend` to generate a detailed bundle analysis report showing:
- Chunk sizes and dependencies
- Gzip and Brotli compression sizes
- Module distribution
- Optimization opportunities

### Performance Utilities
The app includes performance monitoring utilities in `src/utils/optimization.ts`:
- Component preloading
- Performance measurement
- Bundle optimization helpers
- Dynamic imports management

## Build Results

### Production Build Stats
- **Total Bundle Size**: 358.69 kB (114.98 kB gzipped)
- **Code Splitting**: 7 separate chunks
- **Source Maps**: Enabled for development
- **Tree Shaking**: Automatic unused code removal

### Chunk Breakdown
- `index-BgVachlx.js`: 358.69 kB (main bundle)
- `TracksPage-CSg6RFE8.js`: 186.33 kB (page chunk)
- `tracks-TcXFyjEL.js`: 152.91 kB (feature chunk)
- `DialogTitle-L3ci9LEG.js`: 50.08 kB (UI component)
- `UploadModal-JfNWwNas.js`: 1.38 kB (lazy modal)
- `ConfirmDialog-3IM56Awu.js`: 1.16 kB (lazy dialog)

## Development Notes

### Dropbox Integration
The app uses Dropbox API for file storage. You'll need to:
1. Create a Dropbox app
2. Get your access token
3. Add it to the `.env` file as `VITE_ACCESS_TOKEN`

For testing purposes, contact @quantumop on Telegram for a valid access token.

### WebSocket Connection
The app connects to WebSocket server on port 8081 for real-time updates:
- Live track updates
- Real-time notifications
- Synchronized state across clients

### Optimistic Updates
The app implements optimistic UI updates for better user experience:
- Immediate UI feedback for deletions
- Rollback on error
- Smooth transitions

### Error Handling
Comprehensive error handling with:
- User-friendly error messages
- Automatic retry mechanisms
- Graceful degradation
- Error boundaries

### Windows Optimization
Special optimizations for Windows development:
- `maxParallelFileOps: 1` prevents EMFILE errors
- Optimized dependency pre-bundling
- Reduced file system load

