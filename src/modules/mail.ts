import { runAppleScript } from '../utils/applescript';

export async function listInbox() {
  const script = `tell application "Mail" to get subject of messages of inbox`;
  return runAppleScript(script);
}

export async function sendMail(recipient: string, subject: string, content: string) {
  const script = `tell application "Mail"
    set newMessage to make new outgoing message with properties {subject:"${subject}", content:"${content}", visible:false}
    tell newMessage
      make new to recipient at end of to recipients with properties {address:"${recipient}"}
      send
    end tell
  end tell`;
  return runAppleScript(script);
}
