const http = require('http');
import { log } from './utils/logger';
import { sendMessage } from './apps/messages';
import { sendMail } from './apps/mail';
import { createEvent } from './apps/calendar';
import { addReminder } from './apps/reminders';
import { createNote } from './apps/notes';

const PORT = process.env.PORT || 3000;

interface RequestBody {
  action: string;
  data: any;
}

function parseBody(req: any): Promise<RequestBody> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end();
  }

  try {
    const body = await parseBody(req);
    switch (body.action) {
      case 'sendMessage':
        await sendMessage(body.data.recipient, body.data.message);
        break;
      case 'sendMail':
        await sendMail(body.data);
        break;
      case 'createEvent':
        await createEvent(body.data);
        break;
      case 'addReminder':
        await addReminder(body.data.text);
        break;
      case 'createNote':
        await createNote(body.data.title, body.data.body);
        break;
      default:
        res.statusCode = 400;
        return res.end('Unknown action');
    }
    res.statusCode = 200;
    res.end('ok');
  } catch (err) {
    res.statusCode = 500;
    res.end('error');
  }
});

server.listen(PORT, () => {
  log(`MCP server listening on port ${PORT}`);
});
