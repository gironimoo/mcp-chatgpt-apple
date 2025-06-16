import { exec } from 'child_process';
import { log, error } from '../utils/logger';

export function buildAddReminderScript(text: string): string {
  return `
  tell application "Reminders"
    make new reminder with properties {name:"${text}"}
  end tell`;
}

export function addReminder(text: string): Promise<void> {
  const script = buildAddReminderScript(text);

  return new Promise((resolve, reject) => {
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) {
        error(`Failed to add reminder: ${err}`);
        reject(err);
        return;
      }
      log(`Added reminder '${text}'`);
      resolve();
    });
  });
}
