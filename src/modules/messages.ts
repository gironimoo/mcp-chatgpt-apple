import { runAppleScript } from '../utils/applescript';

export async function sendMessage(recipient: string, text: string) {
  const script = `tell application "Messages" to send "${text}" to buddy "${recipient}" of service 1`;
  return runAppleScript(script);
}

export async function listChats() {
  const script = `tell application "Messages" to get name of every text chat`;
  return runAppleScript(script);
}
