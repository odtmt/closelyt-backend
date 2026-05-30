import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  // 🧠 MAIN FUNCTION USED BY WEBHOOK
  async generateReply(text: string): Promise<string> {
    if (!text) {
      return "Sorry, I didn't understand that.";
    }

    const msg = text.toLowerCase();

    // Simple CRM-style AI logic (replace later with OpenAI)
    if (msg.includes('price')) {
      return "Thanks for your interest 🙌. I'll send you our pricing details shortly.";
    }

    if (msg.includes('hello') || msg.includes('hi')) {
      return 'Hello 👋 Welcome to Closelyt! How can I help you today?';
    }

    if (msg.includes('buy') || msg.includes('order')) {
      return 'Great 👍 I can help you place your order. What exactly are you looking for?';
    }

    return `Thanks for your message 👍 We will get back to you shortly.`;
  }

  // ✅ HEALTH CHECK
  test() {
    return {
      success: true,
      message: 'AI service is working correctly ⚡',
    };
  }

  // 🧠 OPTIONAL FEATURE: NAME GENERATOR
  generateSuggestions(input: string) {
    const base = input?.toLowerCase() || 'business';

    const prefixes = ['Neo', 'Prime', 'Ultra', 'Smart', 'Zen', 'Auto', 'Pro'];
    const suffixes = ['Hub', 'AI', 'Flow', 'Connect', 'X', 'Labs', 'Sync'];

    const results = [];

    for (let i = 0; i < 10; i++) {
      const name =
        prefixes[Math.floor(Math.random() * prefixes.length)] +
        base.charAt(0).toUpperCase() +
        base.slice(1) +
        suffixes[Math.floor(Math.random() * suffixes.length)];

      results.push(name);
    }

    return {
      input,
      suggestions: results,
    };
  }

  // 💬 FOLLOW-UP MESSAGE (CRM CORE)
  generateFollowUp(customerName: string) {
    return {
      message: `Hi ${customerName}, just checking in 😊. Are you still interested in moving forward?`,
    };
  }
}
