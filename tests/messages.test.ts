import assert from 'assert';
import { buildSendMessageScript } from '../src/apps/messages';

const script = buildSendMessageScript('TestUser', 'Hello');
assert(script.includes('send "Hello"'));
assert(script.includes('buddy "TestUser"'));
console.log('messages.test passed');
