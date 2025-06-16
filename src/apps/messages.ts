import { exec } from 'child_process';
import { log, error } from '../utils/logger';

export function buildSendMessageScript(recipient: string, message: string): string {
  return `
  tell application "Messages"
    send "${message}" to buddy "${recipient}" of service "SMS"
  end tell`;
}

export function sendMessage(recipient: string, message: string): Promise<void> {
  const script = buildSendMessageScript(recipient, message);

  return new Promise((resolve, reject) => {
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) {
        error(`Failed to send message: ${err}`);
        reject(err);
        return;
      }
      log(`Sent message to ${recipient}`);
      resolve();
    });
  });
}
