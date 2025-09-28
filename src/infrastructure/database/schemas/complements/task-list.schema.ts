/*
task list Schema
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskListDocument = TaskList & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false, collection: 'list' })
export class TaskList {
  @Prop({ required: true })
  assignName!: string;

  @Prop({ required: true })
  function!: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskList);
