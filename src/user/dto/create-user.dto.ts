import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  isActive: boolean;
  
  @IsBoolean()
  is_creator: boolean;
}