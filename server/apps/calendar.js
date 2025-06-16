const { exec } = require('child_process');
exports.handle = function(body, res) {
  const { title, date } = body || {};
  if (!title || !date) {
    res.statusCode = 400;
    return res.end('Missing fields');
  }
  const script = `tell application "Calendar"
    tell calendar "Home"
      make new event with properties {summary:"${title.replace(/"/g,'\\"')}", start date:date "${date}", end date:date "${date}" + (1 * hours)}
    end tell
end tell`;
  exec(`osascript -e '${script}'`, err => {
    if (err) {
      console.error('Calendar error:', err);
      res.statusCode = 500;
      res.end('Failed to create event');
    } else {
      res.end('Event created');
    }
  });
};
