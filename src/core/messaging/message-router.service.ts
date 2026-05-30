import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRouterService {
  async send(phone: string, message: string) {
    console.log(`Sending message to ${phone}: ${message}`);
  }
}
