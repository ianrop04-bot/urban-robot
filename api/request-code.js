import { storeCode } from '@/lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { phone } = req.body;
  const code = Math.floor(10000000 + Math.random() * 90000000).toString();
  
  await storeCode(phone, code);
  
  res.json({
    success: true,
    code,
    message: `Your code: ${code}. Send this to WhatsApp bot.`,
    expires: '10 minutes'
  });
}
