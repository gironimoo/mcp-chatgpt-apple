import express from 'express';
import * as Messages from './modules/messages';
import * as Mail from './modules/mail';
import * as Calendar from './modules/calendar';
import * as Reminders from './modules/reminders';
import * as Notes from './modules/notes';

const app = express();
app.use(express.json());

app.post('/messages/send', async (req, res) => {
  const { recipient, text } = req.body;
  try {
    const result = await Messages.sendMessage(recipient, text);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/messages/chats', async (_req, res) => {
  try {
    const result = await Messages.listChats();
    res.json({ chats: result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/mail/inbox', async (_req, res) => {
  try {
    const result = await Mail.listInbox();
    res.json({ inbox: result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/mail/send', async (req, res) => {
  const { recipient, subject, content } = req.body;
  try {
    const result = await Mail.sendMail(recipient, subject, content);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/calendar/create', async (req, res) => {
  const { title, start, end } = req.body;
  try {
    const result = await Calendar.createEvent(title, start, end);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/calendar/events', async (_req, res) => {
  try {
    const result = await Calendar.listEvents();
    res.json({ events: result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/reminders/add', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await Reminders.addReminder(text);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/reminders/list', async (_req, res) => {
  try {
    const result = await Reminders.listReminders();
    res.json({ reminders: result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/notes/create', async (req, res) => {
  const { title, body } = req.body;
  try {
    const result = await Notes.createNote(title, body);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/notes/list', async (_req, res) => {
  try {
    const result = await Notes.listNotes();
    res.json({ notes: result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
