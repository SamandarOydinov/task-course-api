import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.courseService.getAllCourses();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }
}
