import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadEngineService {
  private leads = new Map();

  async resolveLead(message: any) {
    const existing = this.leads.get(message.phone);

    if (existing) return existing;

    const lead = {
      phone: message.phone,
      status: 'new',
      messages: [],
    };

    this.leads.set(message.phone, lead);
    return lead;
  }

  async saveMessage(lead: any, message: any) {
    lead.messages.push(message);
    this.leads.set(lead.phone, lead);
  }

  async updateStatus(lead: any, reply: string) {
    lead.status = reply?.includes('buy') ? 'converted' : 'active';
    this.leads.set(lead.phone, lead);
  }
}
