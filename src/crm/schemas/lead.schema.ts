import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true })
export class Lead {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  lastMessage: string;

  @Prop({ default: 'new' })
  status: string; // new, contacted, converted
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
