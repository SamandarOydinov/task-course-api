// src/student/dto/register-course.dto.ts
import { IsMongoId } from 'class-validator';

export class RegisterCourseDto {
  @IsMongoId()
  courseId: string;
}
