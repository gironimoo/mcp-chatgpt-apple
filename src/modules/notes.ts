import { runAppleScript } from '../utils/applescript';

export async function createNote(title: string, body: string) {
  const script = `tell application "Notes" to make new note at folder "Notes" with properties {name:"${title}", body:"${body}"}`;
  return runAppleScript(script);
}

export async function listNotes() {
  const script = `tell application "Notes" to get the name of notes of folder "Notes"`;
  return runAppleScript(script);
}
