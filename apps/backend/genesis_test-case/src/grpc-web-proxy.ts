import express from 'express';
import cors from 'cors';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import compression from 'compression';

const app = express();
const PORT = process.env.GRPC_WEB_PORT || 8081;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'grpc-timeout', 'grpc-encoding', 'grpc-accept-encoding']
}));

app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression() as unknown as express.RequestHandler);

const PROTO_PATH = path.resolve(__dirname, 'music_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const musicProto = grpc.loadPackageDefinition(packageDefinition) as any;

const grpcClient = new musicProto.music.TrackService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const genreClient = new musicProto.music.GenreService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const grpcCall = (client: any, method: string, request: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    client[method](request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

app.post('/music.GenreService/getAllGenres', async (req, res) => {
  try {
    const response = await grpcCall(genreClient, 'getAllGenres', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/getAllTracks', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'getAllTracks', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/getTrackById', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'getTrackById', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/createTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'createTrack', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/updateTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'updateTrack', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/music.TrackService/deleteTrack', async (req, res) => {
  try {
    const response = await grpcCall(grpcClient, 'deleteTrack', req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'gRPC-Web Proxy' });
});

app.listen(PORT, () => {
  console.log(`gRPC-Web proxy running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('Available routes:');
  console.log('- POST /music.GenreService/getAllGenres');
  console.log('- POST /music.TrackService/getAllTracks');
  console.log('- POST /music.TrackService/getTrackById');
  console.log('- POST /music.TrackService/createTrack');
  console.log('- POST /music.TrackService/updateTrack');
  console.log('- POST /music.TrackService/deleteTrack');
});

export { app }; 