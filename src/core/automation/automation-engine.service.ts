import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationEngineService {
  async check(
    lead: any,
    message: { phone: any; text: any; timestamp: Date },
  ): Promise<string | null> {
    // STEP 1: Basic rule example (you can expand later)
    if (!lead || !message?.text) {
      return null;
    }

    const text = message.text.toLowerCase();

    // STEP 2: Simple automation rules
    if (text.includes('price')) {
      return 'Our pricing starts at ₦5,000. Want full details?';
    }

    if (text.includes('hello') || text.includes('hi')) {
      return `Hello 👋 Thanks for contacting us! How can I help you today?`;
    }

    // STEP 3: No automation match
    return null;
  }
}
