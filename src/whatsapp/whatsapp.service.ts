import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly token = process.env.WHATSAPP_TOKEN;
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  async sendMessage(to: string, message: string) {
    const url = `https://graph.facebook.com/v20.0/${this.phoneNumberId}/messages`;

    try {
      const res = await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('📤 Message sent:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Send error:', err.response?.data || err.message);
    }
  }
}
