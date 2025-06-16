const { exec } = require('child_process');
exports.handle = function(body, res) {
  const { to, subject, content } = body || {};
  if (!to || !subject || !content) {
    res.statusCode = 400;
    return res.end('Missing fields');
  }
  const script = `tell application "Mail"
    set newMessage to make new outgoing message with properties {subject:"${subject.replace(/"/g,'\\"')}", content:"${content.replace(/"/g,'\\"')}", visible:false}
    tell newMessage
        make new to recipient at end of to recipients with properties {address:"${to}"}
        send
    end tell
end tell`;
  exec(`osascript -e '${script}'`, err => {
    if (err) {
      console.error('Mail error:', err);
      res.statusCode = 500;
      res.end('Failed to send mail');
    } else {
      res.end('Mail sent');
    }
  });
};
