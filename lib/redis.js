import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: "https://composed-scorpion-37902.upstash.io",
  token: "AZQOAAIncDExYzcwNWZlZTkxMTc0OGNkOTJmOGY4ZTUyZmY2OTlhYXAxMzc5MDI",
});

export async function storeCode(phone, code) {
  return redis.setex(`code:${phone}`, 600, JSON.stringify({
    code, phone, created: Date.now(), attempts: 0
  }));
}

export async function verifyAndCreateSession(phone, userCode) {
  const data = await redis.get(`code:${phone}`);
  if (!data) return { error: 'Code expired' };
  
  const stored = JSON.parse(data);
  if (stored.code !== userCode) return { error: 'Invalid code' };
  
  // Create session
  await redis.setex(`session:${phone}`, 604800, JSON.stringify({
    phone, active: true, created: Date.now()
  }));
  
  await redis.del(`code:${phone}`);
  return { success: true };
  }
