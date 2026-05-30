import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  async sendMessage(phone: string, message: string) {
    console.log(`📤 WhatsApp to ${phone}: ${message}`);

    // TODO: integrate real WhatsApp Cloud API later
    return true;
  }
}
