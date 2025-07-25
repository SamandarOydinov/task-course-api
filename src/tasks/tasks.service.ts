import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      createdBy: new Types.ObjectId(userId),
    });
    return createdTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ createdBy: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.createdBy.toString() !== userId)
      throw new ForbiddenException('Access denied');
    return task;
  }

  async update(
    id: string,
    dto: Partial<CreateTaskDto>,
    userId: string,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, dto);
    return task.save();
  }

  async delete(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await task.deleteOne();
  }
}
