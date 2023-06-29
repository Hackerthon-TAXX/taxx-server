import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoriesCreateDto {
  @ApiProperty({
    description: '사용 유저 UID',
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  usersId: number;

  @ApiProperty({
    description: '기사 ID',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ridersId: number;

  @ApiProperty({
    description: '물품 사이즈',
    example: '중',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({
    description: '요청 사항',
    example: '유리 소재여서 깨질 수 있습니다. 조심히 다뤄주세요.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  request: string;

  @ApiProperty({
    description: '결제 수단',
    example: '현대카드 486',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  payments: string;

  @ApiProperty({
    description: '출발 주소',
    example: '판교역',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  startAddress: string;

  @ApiProperty({
    description: '도착 주소',
    example: '수원역',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  arrivalAddress: string;
}
