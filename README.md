# MCP ChatGPT Apple Automation Server

This project provides a modular MCP server allowing AnythingLLM or other clients to control macOS applications using AppleScript. Each application is isolated in its own module and accessible through HTTP endpoints.

## Features

- Send iMessage texts and list chats
- Read inbox emails and send new mail
- Create calendar events and list current events
- Add and list reminders
- Create and list notes

## Installation

```bash
npm install
npm run build
```

Run the server with:

```bash
npm start
```

During development you can run:

```bash
npm run dev
```

## Example Usage

Send a message:

```bash
curl -X POST http://localhost:3000/messages/send \
  -H 'Content-Type: application/json' \
  -d '{"recipient":"john@example.com","text":"Hello"}'
```

Create a note:

```bash
curl -X POST http://localhost:3000/notes/create \
  -H 'Content-Type: application/json' \
  -d '{"title":"Todo","body":"Buy groceries"}'
```

## Notes

AppleScript commands require the server to run on macOS with appropriate permissions for automation. Grant access when macOS prompts for control of each application.
