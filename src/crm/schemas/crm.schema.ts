import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  phone: string;

  @Prop({ default: 'Unknown' })
  name: string;

  @Prop({ default: '' })
  lastMessage: string;

  @Prop({ default: 'active' })
  status: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
