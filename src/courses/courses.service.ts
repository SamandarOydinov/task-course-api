import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(dto: CreateCourseDto): Promise<Course> {
    const newCourse = new this.courseModel(dto);
    return newCourse.save();
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
}
