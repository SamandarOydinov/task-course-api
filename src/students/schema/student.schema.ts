// src/student/student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  registeredCourses: Types.ObjectId[]; // or Course[]
}

export const StudentSchema = SchemaFactory.createForClass(Student);
