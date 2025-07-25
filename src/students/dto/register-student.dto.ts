import { IsMongoId } from 'class-validator';

export class RegisterCourseDto {
  @IsMongoId()
  courseId: string;
}
