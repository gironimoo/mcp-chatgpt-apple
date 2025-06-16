import { exec } from 'child_process';
import { log, error } from '../utils/logger';

export interface EventOptions {
  title: string;
  startDate: string; // ISO format
  endDate: string;   // ISO format
}

export function buildCreateEventScript(opts: EventOptions): string {
  return `
  tell application "Calendar"
    tell calendar "Home"
      make new event with properties {summary:"${opts.title}", start date:date "${opts.startDate}", end date:date "${opts.endDate}"}
    end tell
  end tell`;
}

export function createEvent(opts: EventOptions): Promise<void> {
  const script = buildCreateEventScript(opts);

  return new Promise((resolve, reject) => {
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) {
        error(`Failed to create event: ${err}`);
        reject(err);
        return;
      }
      log(`Created calendar event '${opts.title}'`);
      resolve();
    });
  });
}
