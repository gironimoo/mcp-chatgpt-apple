import { runAppleScript } from '../utils/applescript';

export async function createEvent(title: string, startDate: string, endDate: string) {
  const script = `tell application "Calendar"
    tell calendar "Home"
      make new event with properties {summary:"${title}", start date:date "${startDate}", end date:date "${endDate}"}
    end tell
  end tell`;
  return runAppleScript(script);
}

export async function listEvents() {
  const script = `tell application "Calendar" to get summary of events of calendar "Home"`;
  return runAppleScript(script);
}
