const http = require('http');
const { spawn } = require('child_process');
const { parse } = require('url');

const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN || '';

const clients = [];

function sendEvent(data) {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(res => res.write(msg));
}

function auth(req) {
  if (!API_TOKEN) return true; // no auth if token not set
  const authHeader = req.headers['authorization'] || '';
  return authHeader === `Bearer ${API_TOKEN}`;
}

function runAppleScript(script, callback) {
  if (!script) return callback('');
  const proc = spawn('osascript', ['-e', script]);
  let output = '';
  proc.stdout.on('data', d => output += d.toString());
  proc.stderr.on('data', d => console.error('AppleScript error:', d.toString()));
  proc.on('close', () => callback(output.trim()));
}

const server = http.createServer((req, res) => {
  if (!auth(req)) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  const url = parse(req.url, true);

  if (url.pathname === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');
    clients.push(res);
    req.on('close', () => {
      const idx = clients.indexOf(res);
      if (idx >= 0) clients.splice(idx, 1);
    });
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        handleCommand(url.pathname, payload, result => {
          sendEvent({ path: url.pathname, result });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', result }));
        });
      } catch (err) {
        res.writeHead(400);
        res.end('Bad Request');
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

function handleCommand(path, payload, cb) {
  let script = '';
  switch (path) {
    case '/notes':
      if (payload.command === 'add') {
        script = `tell application "Notes" to make new note with properties {name:"${payload.title}", body:"${payload.body}"}`;
      } else if (payload.command === 'list') {
        script = 'tell application "Notes" to get the name of notes';
      }
      break;
    case '/reminders':
      if (payload.command === 'add') {
        script = `tell application "Reminders" to make new reminder with properties {name:"${payload.title}"}`;
      }
      break;
    case '/calendar':
      if (payload.command === 'create') {
        const { title, date } = payload;
        script = `tell application "Calendar" to tell calendar "Home" to make new event with properties {summary:"${title}", start date:(date "${date}")}`;
      }
      break;
    case '/messages':
      if (payload.command === 'send') {
        script = `tell application "Messages" to send "${payload.text}" to buddy "${payload.recipient}" of service "SMS"`;
      }
      break;
    case '/mail':
      if (payload.command === 'send') {
        script = `tell application "Mail" to send (make new outgoing message with properties {subject:"${payload.subject}", content:"${payload.body}", visible:false} at end of outgoing messages)`;
      }
      break;
    case '/music':
      if (payload.command === 'play') {
        script = `tell application "Music" to play track "${payload.track}"`;
      }
      break;
  }
  runAppleScript(script, cb);
}

server.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});

