import assert from 'assert';
import { buildAddReminderScript } from '../src/apps/reminders';

const script = buildAddReminderScript('Buy milk');
assert(script.includes('Buy milk'));
console.log('reminders.test passed');
