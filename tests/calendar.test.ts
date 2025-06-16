import assert from 'assert';
import { buildCreateEventScript, EventOptions } from '../src/apps/calendar';

const opts: EventOptions = { title: 'Meet', startDate: '2024-01-01T10:00:00Z', endDate: '2024-01-01T11:00:00Z' };
const script = buildCreateEventScript(opts);
assert(script.includes('Meet'));
assert(script.includes('start date:date'));
console.log('calendar.test passed');
