import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { getTracks } from './utils/db';

const server = createServer();
const wss = new WebSocketServer({ server });

let activeTrackTitle = '';
let tracks: { title: string }[] = [];

async function updateTracksList() {
  try {
    const { tracks: allTracks } = await getTracks({ page: 1, limit: 1000 });
    tracks = allTracks;
  } catch (e) {
    tracks = [];
  }
}

async function pickRandomTrackAndBroadcast() {
  if (tracks.length === 0) {
    await updateTracksList();
  }
  if (tracks.length > 0) {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    activeTrackTitle = tracks[randomIndex].title;
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ activeTrackTitle }));
      }
    });
  }
}

setInterval(() => {
  pickRandomTrackAndBroadcast();
}, 1000 + Math.random() * 1000);

wss.on('connection', (ws: WebSocket) => {
  ws.send(JSON.stringify({ activeTrackTitle }));
});

export function startWSServer(port: number) {
  server.listen(port, () => {
    console.log(`WebSocket server running on ws://localhost:${port}`);
  });
}

export { updateTracksList }; 