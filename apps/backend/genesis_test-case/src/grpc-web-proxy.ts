import express from 'express';
import cors from 'cors';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const app = express();
const PORT = process.env.GRPC_WEB_PORT || 8080;

// CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// JSON parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Load proto file
const PROTO_PATH = path.resolve(__dirname, 'music_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const musicProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Create gRPC client
const grpcClient = new musicProto.music.TrackService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const genreClient = new musicProto.music.GenreService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Helper function to convert gRPC call to Promise
function grpcCall(client: any, method: string, request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client[method](request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Genre Service endpoints
app.post('/music.GenreService/GetAllGenres', async (req, res) => {
  try {
    console.log('GetAllGenres request body:', req.body);
    const response = await grpcCall(genreClient, 'getAllGenres', req.body);
    console.log('GetAllGenres response:', response);
    console.log('GetAllGenres response.genres:', response.genres);
    console.log('GetAllGenres response.genres type:', typeof response.genres);
    console.log('GetAllGenres response.genres length:', response.genres?.length);
    if (response.genres && response.genres.length > 0) {
      console.log('First genre:', response.genres[0]);
      console.log('First genre type:', typeof response.genres[0]);
    }
    res.json(response);
  } catch (error: any) {
    console.error('GetAllGenres error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Track Service endpoints
app.post('/music.TrackService/GetAllTracks', async (req, res) => {
  try {
    console.log('GetAllTracks request body:', req.body);
    const response = await grpcCall(grpcClient, 'getAllTracks', req.body);
    console.log('GetAllTracks response:', response);
    res.json(response);
  } catch (error: any) {
    console.error('GetAllTracks error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/GetTrackBySlug', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'getTrackBySlug', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('GetTrackBySlug error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/CreateTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'createTrack', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('CreateTrack error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/UpdateTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'updateTrack', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('UpdateTrack error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/DeleteTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'deleteTrack', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('DeleteTrack error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/DeleteMultipleTracks', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'deleteMultipleTracks', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('DeleteMultipleTracks error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/UploadTrackFile', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'uploadTrackFile', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('UploadTrackFile error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/DeleteTrackFile', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'deleteTrackFile', req.body);
    res.json(response);
  } catch (error: any) {
    console.error('DeleteTrackFile error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'gRPC-Web Proxy' });
});

// Start server
app.listen(PORT, () => {
  console.log(`gRPC-Web proxy running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export { app }; 