export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    const { username, server } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Не определен';

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const message = `Имя: ${username}\nСервер: ${server}\nIP: ${ip}`;
    const tgUrl = `https://telegram.org{BOT_TOKEN}/sendMessage`;

    try {
        await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Ошибка отправки в Telegram' });
    }
}
