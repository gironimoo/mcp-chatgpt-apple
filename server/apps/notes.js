const { exec } = require('child_process');
exports.handle = function(body, res) {
  const { title, content } = body || {};
  if (!title || !content) {
    res.statusCode = 400;
    return res.end('Missing fields');
  }
  const script = `tell application "Notes"
    tell account 1
      make new note at folder "Notes" with properties {name:"${title.replace(/"/g,'\\"')}", body:"${content.replace(/"/g,'\\"')}"}
    end tell
end tell`;
  exec(`osascript -e '${script}'`, err => {
    if (err) {
      console.error('Notes error:', err);
      res.statusCode = 500;
      res.end('Failed to create note');
    } else {
      res.end('Note created');
    }
  });
};
