import { execFile } from 'child_process';

export function runAppleScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = execFile('osascript', ['-e', script], (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      resolve(stdout.trim());
    });
  });
}
