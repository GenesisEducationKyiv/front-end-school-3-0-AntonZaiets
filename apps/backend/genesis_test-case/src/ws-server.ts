import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { getTracks } from './utils/db';

// Створюємо HTTP сервер (Fastify слухає на цьому ж порту)
const server = createServer();
const wss = new WebSocketServer({ server });

let activeTrackTitle = '';
let tracks: { title: string }[] = [];

// Функція для вибору випадкового треку
async function updateTracksList() {
  try {
    // Отримуємо всі треки (без пагінації)
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
    // Відправляємо всім клієнтам
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ activeTrackTitle }));
      }
    });
  }
}

// Оновлюємо треки та стрімимо нову назву кожні 1-2 секунди
setInterval(() => {
  pickRandomTrackAndBroadcast();
}, 1000 + Math.random() * 1000);

wss.on('connection', (ws: WebSocket) => {
  // Відправляємо поточний активний трек одразу після підключення
  ws.send(JSON.stringify({ activeTrackTitle }));
});

export function startWSServer(port: number) {
  server.listen(port, () => {
    console.log(`WebSocket server running on ws://localhost:${port}`);
  });
}

export { updateTracksList }; 