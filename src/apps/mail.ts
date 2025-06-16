import { exec } from 'child_process';
import { log, error } from '../utils/logger';

export interface MailOptions {
  to: string;
  subject: string;
  body: string;
}

export function buildSendMailScript(opts: MailOptions): string {
  return `
  tell application "Mail"
    set newMessage to make new outgoing message with properties {subject:"${opts.subject}", content:"${opts.body}\n" & signature name}
    tell newMessage
      make new to recipient at end of to recipients with properties {address:"${opts.to}"}
      send
    end tell
  end tell`;
}

export function sendMail(opts: MailOptions): Promise<void> {
  const script = buildSendMailScript(opts);

  return new Promise((resolve, reject) => {
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) {
        error(`Failed to send mail: ${err}`);
        reject(err);
        return;
      }
      log(`Sent mail to ${opts.to}`);
      resolve();
    });
  });
}
