import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';

export class UsersPaymentsDto {
  @ApiProperty({
    description: '유저 UID',
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '결제수단',
    example: { type: 'GooglePay', label: '신한카드 934' },

    required: true,
  })
  @IsOptional()
  @IsObject()
  payments: string;
}
