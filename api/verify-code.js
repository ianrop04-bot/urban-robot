import { verifyAndCreateSession } from '@/lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { phone, code } = req.body;
  const result = await verifyAndCreateSession(phone, code);
  
  if (result.success) {
    res.json({
      success: true,
      message: '✅ WhatsApp bot activated!',
      commands: ['/help', '/sticker', '/gpt', '/news']
    });
  } else {
    res.status(400).json({ error: result.error });
  }
}
