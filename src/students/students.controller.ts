// src/student/student.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RegisterCourseDto } from './dto/register-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('register')
  async register(@Body() dto: CreateStudentDto) {
    return this.studentService.register(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post(':id/register')
  async registerCourse(
    @Param('id') studentId: string,
    @Body() dto: RegisterCourseDto,
  ) {
    return this.studentService.registerCourse(studentId, dto.courseId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Get(':id/courses')
  async getCourses(@Param('id') studentId: string) {
    return this.studentService.getCourses(studentId);
  }
}
