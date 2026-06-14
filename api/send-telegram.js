export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, type, message } = req.body;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // هذا المتغير سيُحفظ في إعدادات Vercel
  const CHAT_ID = process.env.CHAT_ID;

  const text = `📩 *طلب مشروع جديد*\n👤 *الاسم:* ${name}\n📧 *الإيميل:* ${email}\n🏗️ *النوع:* ${type}\n📝 *التفاصيل:* ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' })
    });

    const data = await response.json();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}