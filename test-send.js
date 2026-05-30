import axios from 'axios';

const token = process.env.WHATSAPP_TOKEN || 'YOUR_TOKEN';
const phoneNumberId = process.env.PHONE_NUMBER_ID || 'YOUR_PHONE_ID';

async function send() {
  try {
    const res = await axios.post(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: 'YOUR_NUMBER_WITH_COUNTRY_CODE',
        type: 'text',
        text: {
          body: 'Closelyt test message 🚀',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('SUCCESS:', res.data);
  } catch (err) {
    console.log('ERROR:', err.response?.data || err.message);
  }
}

send();
