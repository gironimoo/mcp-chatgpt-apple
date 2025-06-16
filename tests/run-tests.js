const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// compile TypeScript
const tsc = spawnSync('tsc', [], { stdio: 'inherit' });
if (tsc.status !== 0) process.exit(tsc.status);

const testsDir = path.join(__dirname, '../dist/tests');
const tests = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.js'));
let failed = false;
for (const test of tests) {
  const result = spawnSync('node', [path.join(testsDir, test)], { stdio: 'inherit' });
  if (result.status !== 0) failed = true;
}
process.exitCode = failed ? 1 : 0;
