// src/task/task.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @Request() req) {
    return this.taskService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.taskService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.taskService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateTaskDto, @Request() req) {
    return this.taskService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.taskService.delete(id, req.user.userId);
  }
}
