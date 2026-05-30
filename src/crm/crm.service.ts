import { Injectable } from '@nestjs/common';

@Injectable()
export class CrmService {
  private leads = new Map();

  upsertLead(phone: string, message: string) {
    const existing = this.leads.get(phone) || {
      phone,
      messages: [],
      status: 'new',
    };

    existing.messages.push({
      text: message,
      timestamp: new Date(),
    });

    this.leads.set(phone, existing);

    return existing;
  }

  saveConversation(phone: string, incoming: string, outgoing: string) {
    const lead = this.leads.get(phone);
    if (!lead) return;

    lead.messages.push(
      { type: 'incoming', text: incoming },
      { type: 'outgoing', text: outgoing },
    );
  }

  triggerAutomation(lead: any) {
    console.log('⚙️ Automation triggered for:', lead.phone);
  }

  getLead(phone: string) {
    return this.leads.get(phone);
  }
}
