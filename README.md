# MCP ChatGPT Apple Server

This project provides a minimal MCP-compatible server to bridge ChatGPT connectors with native macOS applications such as Notes, Reminders, Calendar, Messages, Mail and Music.

The server exposes a Server-Sent Events (SSE) endpoint at `/sse` and simple POST routes for each application. The routes invoke AppleScript via the `osascript` command line tool and stream results back to connected clients.

## Requirements
- macOS with the `osascript` command available.
- Node.js (version 16 or higher).

## Usage
1. Configure an API token (optional) and start the server:
   ```bash
   export API_TOKEN=secret
   node index.js
   ```
   The server listens on port `3000` by default.

2. Connect to the SSE endpoint:
   ```bash
   curl -H "Authorization: Bearer secret" http://localhost:3000/sse
   ```

3. Send commands to the available routes. Examples:
   - Add a note:
     ```bash
     curl -X POST -H "Authorization: Bearer secret" \
          -d '{"command":"add","title":"Demo","body":"Hello"}' \
          http://localhost:3000/notes
     ```
   - Create a reminder:
     ```bash
     curl -X POST -H "Authorization: Bearer secret" \
          -d '{"command":"add","title":"Buy Milk"}' \
          http://localhost:3000/reminders
     ```

All results are streamed to connected clients through `/sse`.

## Security
If `API_TOKEN` is set, all requests must include an `Authorization` header in the form `Bearer <token>`.

## Tests
Run `npm test` to perform a syntax check of `index.js`:

```bash
npm test
```

This uses `node -c` to verify that the server code parses correctly.

## Disclaimer
This code is a minimal example and may require adjustments for production use. AppleScript commands may vary depending on your setup and applications.
