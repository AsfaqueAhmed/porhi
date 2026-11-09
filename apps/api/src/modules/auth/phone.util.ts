export const PHONE_REGEX = /^(?:\+8801|8801|01)[3-9]\d{8}$|^\+[1-9]\d{7,14}$/;

export function normalizeBangladeshPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    throw new Error('Invalid phone number format');
  }

  const trimmed = phone.trim();
  if (!PHONE_REGEX.test(trimmed)) {
    throw new Error('Invalid phone number format');
  }

  const bdMatch = trimmed.match(/^(?:\+88|88)?(01[3-9]\d{8})$/);
  if (bdMatch) {
    return bdMatch[1];
  }

  return trimmed;
}
