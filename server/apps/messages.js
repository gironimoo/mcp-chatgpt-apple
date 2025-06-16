const { exec } = require('child_process');
exports.handle = function(body, res) {
  const { recipient, text } = body || {};
  if (!recipient || !text) {
    res.statusCode = 400;
    return res.end('Missing recipient or text');
  }
  const script = `tell application "Messages" to send "${text.replace(/"/g,'\\"')}" to buddy "${recipient}" of service "SMS"`;
  exec(`osascript -e '${script}'`, err => {
    if (err) {
      console.error('Messages error:', err);
      res.statusCode = 500;
      res.end('Failed to send message');
    } else {
      res.end('Message sent');
    }
  });
};
