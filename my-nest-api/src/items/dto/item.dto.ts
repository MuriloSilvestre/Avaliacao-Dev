import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class UpdateItemDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
