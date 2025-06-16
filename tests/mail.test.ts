import assert from 'assert';
import { buildSendMailScript, MailOptions } from '../src/apps/mail';

const opts: MailOptions = { to: 'user@example.com', subject: 'Test', body: 'Hi' };
const script = buildSendMailScript(opts);
assert(script.includes('user@example.com'));
assert(script.includes('subject:"Test"'));
console.log('mail.test passed');
