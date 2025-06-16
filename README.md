# MCP Apple Automation Server

This project provides a lightweight MCP (Message Control Protocol) server to automate native macOS applications. Each application is implemented as a separate module using AppleScript executed via `osascript`.

## Features

- **Messages** – send SMS/iMessage
- **Mail** – send email through Mail.app
- **Calendar** – create calendar events
- **Reminders** – create reminders
- **Notes** – create notes

The implementation avoids external Node packages and relies only on built‑in `http` and `child_process` modules so it can run in restricted environments.

## Usage

1. Start the server:
   ```bash
   node server/index.js
   ```
2. Send HTTP POST requests to control each app:
   - `POST /messages` with `{ "recipient": "+15551234567", "text": "Hello" }`
   - `POST /mail` with `{ "to": "name@example.com", "subject": "Hi", "content": "Body" }`
   - `POST /calendar` with `{ "title": "Meeting", "date": "2024-07-01T10:00:00" }`
   - `POST /reminders` with `{ "name": "Task", "dueDate": "2024-07-01T12:00:00" }`
   - `POST /notes` with `{ "title": "Note", "content": "My note" }`

## macOS Permissions

Running AppleScript requires that the Node.js executable be granted automation permissions. On first use macOS will prompt for permissions for Messages, Mail, Calendar, Reminders and Notes.

## Limitations

- The server must run on macOS to access AppleScript APIs.
- Error handling and authentication are minimal.

## Development

All source files are under the `server` directory.
