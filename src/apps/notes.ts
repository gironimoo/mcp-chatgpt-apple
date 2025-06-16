import { exec } from 'child_process';
import { log, error } from '../utils/logger';

export function buildCreateNoteScript(title: string, body: string): string {
  return `
  tell application "Notes"
    tell account "iCloud"
      make new note at folder "Notes" with properties {name:"${title}", body:"${body}"}
    end tell
  end tell`;
}

export function createNote(title: string, body: string): Promise<void> {
  const script = buildCreateNoteScript(title, body);

  return new Promise((resolve, reject) => {
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) {
        error(`Failed to create note: ${err}`);
        reject(err);
        return;
      }
      log(`Created note '${title}'`);
      resolve();
    });
  });
}
