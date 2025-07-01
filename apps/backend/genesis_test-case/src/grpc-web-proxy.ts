import express from 'express';
import cors from 'cors';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const app = express();
const PORT = process.env.GRPC_WEB_PORT || 8080;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

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


const generateRoutesFromProto = () => {
  const routes: Array<{ path: string; client: any; method: string }> = [];
  const services = musicProto.music;
  if (services.GenreService && services.GenreService.service) {
    const genreMethods = Object.keys(services.GenreService.service);
    genreMethods.forEach(method => {
      routes.push({
        path: `/music.GenreService/${method}`,
        client: genreClient,
        method: method.charAt(0).toLowerCase() + method.slice(1)
      });
    });
  }

  if (services.TrackService && services.TrackService.service) {
    const trackMethods = Object.keys(services.TrackService.service);
    trackMethods.forEach(method => {
      routes.push({
        path: `/music.TrackService/${method}`,
        client: grpcClient,
        method: method.charAt(0).toLowerCase() + method.slice(1)
      });
    });
  }
  
  return routes;
};

const createRouteHandler = (client: any, method: string) => {
  return async (req: express.Request, res: express.Response) => {
    try {
      const response = await grpcCall(client, method, req.body);
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
};

const routes = generateRoutesFromProto();

routes.forEach(({ path, client, method }) => {
  app.post(path, createRouteHandler(client, method));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'gRPC-Web Proxy' });
});

app.listen(PORT, () => {
  console.log(`gRPC-Web proxy running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Auto-generated routes:`, routes.map(r => r.path));
});

export { app }; 