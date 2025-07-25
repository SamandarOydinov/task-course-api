import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user.save();
  }

  async findAll() {
    const all_user = await this.userModel.find();
    if (all_user) return all_user;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ id });
    if (user) return user;
    return 'user not found';
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (user) return user;
    return 'user not found';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated_user = await this.userModel.findByIdAndUpdate(
      { id },
      updateUserDto,
      { new: true },
    );
    return updated_user;
  }

  async remove(id: number) {
    return await this.userModel.deleteOne({ id });
  }
}
