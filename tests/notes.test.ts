import assert from 'assert';
import { buildCreateNoteScript } from '../src/apps/notes';

const script = buildCreateNoteScript('Title', 'Body');
assert(script.includes('Title'));
assert(script.includes('Body'));
console.log('notes.test passed');
