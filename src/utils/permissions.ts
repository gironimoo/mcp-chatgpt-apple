import { execSync } from 'child_process';
import { log } from './logger';

export function requestPermission(bundleId: string) {
  try {
    execSync(`tccutil reset All ${bundleId}`);
    log(`Requested permissions for ${bundleId}`);
  } catch (err) {
    log(`Could not request permissions for ${bundleId}: ${err}`);
  }
}
