import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schema/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import { Course, CourseDocument } from '../courses/schema/course.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async register(createStudentDto: CreateStudentDto): Promise<Student> {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
    const createdStudent = new this.studentModel({
      ...createStudentDto,
      password: hashedPassword,
    });
    return createdStudent.save();
  }

  async registerCourse(studentId: string, courseId: string) {
    const student = await this.studentModel.findById(studentId);
    if (!student) throw new NotFoundException('Student not found');

    const course = await this.courseModel.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');

    const alreadyRegistered = student.registeredCourses.includes(course.id);
    if (alreadyRegistered)
      throw new BadRequestException('Already registered for this course');

    student.registeredCourses.push(course.id);
    return student.save();
  }

  async getCourses(studentId: string) {
    return this.studentModel.findById(studentId).populate('registeredCourses');
  }
}
