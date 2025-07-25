// src/student/dto/create-student.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
