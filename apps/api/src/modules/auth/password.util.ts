import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!password || !storedHash || !storedHash.includes(':')) {
    return false;
  }

  const parts = storedHash.split(':');
  if (parts.length !== 2) {
    return false;
  }

  const [salt, expectedHex] = parts;
  if (!salt || !expectedHex || expectedHex.length !== KEY_LENGTH * 2 || !/^[0-9a-f]+$/i.test(expectedHex)) {
    return false;
  }

  const expectedBuffer = Buffer.from(expectedHex, 'hex');
  if (expectedBuffer.length !== KEY_LENGTH) {
    return false;
  }

  const derivedBuffer = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  if (derivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(derivedBuffer, expectedBuffer);
}
