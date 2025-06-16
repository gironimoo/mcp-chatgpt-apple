const http = require('http');
const { URL } = require('url');
const messages = require('./apps/messages');
const mail = require('./apps/mail');
const calendar = require('./apps/calendar');
const reminders = require('./apps/reminders');
const notes = require('./apps/notes');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

function parseBody(req, cb) {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    try {
      cb(null, data ? JSON.parse(data) : {});
    } catch (err) {
      cb(err);
    }
  });
  req.on('error', err => cb(err));
}

http.createServer((req, res) => {
  if (!req.url || req.method !== 'POST') {
    res.statusCode = 404;
    return res.end('Not Found');
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  parseBody(req, (err, body) => {
    if (err) {
      res.statusCode = 400;
      return res.end('Bad Request');
    }
    switch (url.pathname) {
      case '/messages':
        messages.handle(body, res); break;
      case '/mail':
        mail.handle(body, res); break;
      case '/calendar':
        calendar.handle(body, res); break;
      case '/reminders':
        reminders.handle(body, res); break;
      case '/notes':
        notes.handle(body, res); break;
      default:
        res.statusCode = 404;
        res.end('Not Found');
    }
  });
}).listen(PORT, () => {
  console.log(`MCP Apple server listening on port ${PORT}`);
});
