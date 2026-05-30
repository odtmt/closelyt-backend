import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/crm.schema';

@Injectable()
export class CrmService {
  constructor(
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
  ) {}

  // ✅ ONE clean method handles both create + update
  async upsertLead(phone: string, message: string) {
    let lead = await this.leadModel.findOne({ phone });

    if (!lead) {
      lead = new this.leadModel({
        phone,
        name: 'Unknown',
        lastMessage: message,
      });
    } else {
      lead.lastMessage = message;
    }

    return lead.save();
  }

  // ✅ store AI reply separately (optional but useful)
  async saveReply(phone: string, reply: string) {
    const lead = await this.leadModel.findOne({ phone });

    if (!lead) return null;

    lead.lastMessage = reply;
    return lead.save();
  }

  async getLeads() {
    return this.leadModel.find().sort({ createdAt: -1 });
  }
}
