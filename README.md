# MCP ChatGPT Apple Server

This project provides a minimal MCP server that allows AnythingLLM to control
native macOS applications such as Messages, Mail, Calendar, Reminders and Notes.
The server is written in TypeScript and communicates with macOS applications via
AppleScript.

## Requirements

- macOS with AppleScript support
- Node.js 18+
- TypeScript (`tsc` command)

## Installation

```bash
npm run build
```

## Running the server

```bash
npm start
```

The server listens on port `3000` by default. Send `POST` requests with a JSON
body containing an `action` field and associated `data`.

Example:

```bash
curl -X POST http://localhost:3000 -d '{"action":"sendMessage","data":{"recipient":"John","message":"Hi"}}'
```

Another example to create a note:

```bash
curl -X POST http://localhost:3000 -d '{"action":"createNote","data":{"title":"Shopping","body":"Eggs, Milk"}}'
```

## Tests

Run the test suite with:

```bash
npm test
```

This compiles the TypeScript sources and executes a small set of unit tests for
the AppleScript builders.

## Connecting AnythingLLM

Create an `anythingllm_mcp_servers.json` file alongside your AnythingLLM
configuration with the following contents:

```json
[
  {
    "name": "macOS MCP",
    "url": "http://localhost:3000"
  }
]
```

Restart AnythingLLM and it will be able to send actions to this server.
