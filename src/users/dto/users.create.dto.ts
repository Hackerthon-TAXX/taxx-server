import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UsersCreateDto {
  @ApiProperty({
    description: 'Kakao 유저 고유식별 번호',
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '유저 이름',
    example: '김관식',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '결제수단',
    example: [
      { type: 'kakao', label: '카카오뱅크 1234' },
      { type: 'ApplePay', label: '현대카드 486' },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  payments: Array<Object>;
}
