import { runAppleScript } from '../utils/applescript';

export async function addReminder(text: string) {
  const script = `tell application "Reminders" to make new reminder with properties {name:"${text}"}`;
  return runAppleScript(script);
}

export async function listReminders() {
  const script = `tell application "Reminders" to get name of reminders`;
  return runAppleScript(script);
}
