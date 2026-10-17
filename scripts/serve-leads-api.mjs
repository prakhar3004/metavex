import { createServer } from 'node:http';
import handler from '../api/leads.mjs';

const server = createServer((request, response) => {
  if (request.url?.split('?')[0] !== '/api/leads') {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ ok: false, code: 'NOT_FOUND' }));
  }
  void handler(request, response).catch(() => {
    if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ ok: false, code: 'SAVE_FAILED' }));
  });
});
server.listen(4301, '127.0.0.1', () => {
  console.log('Lead API listening on http://127.0.0.1:4301. Webhook credentials are read from server environment only.');
});
