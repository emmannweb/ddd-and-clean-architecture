/*
task Schema
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskList } from './complements/task-list.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false, collection: 'task' })
export class Task {
  @Prop({ required: true })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true, type: [TaskList] })
  list!: TaskList[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
