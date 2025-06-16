const { exec } = require('child_process');
exports.handle = function(body, res) {
  const { name, dueDate } = body || {};
  if (!name) {
    res.statusCode = 400;
    return res.end('Missing name');
  }
  const duePart = dueDate ? `, due date:date "${dueDate}"` : '';
  const script = `tell application "Reminders" to make new reminder with properties {name:"${name.replace(/"/g,'\\"')}"${duePart}}`;
  exec(`osascript -e '${script}'`, err => {
    if (err) {
      console.error('Reminders error:', err);
      res.statusCode = 500;
      res.end('Failed to create reminder');
    } else {
      res.end('Reminder created');
    }
  });
};
