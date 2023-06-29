import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HistoriesCreateDto {
  @ApiProperty({
    description: "물품 사이즈",
    example: "중",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({
    description: "요청 사항",
    example: "유리 소재여서 깨질 수 있습니다. 조심히 다뤄주세요.",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  request: string;

  @ApiProperty({
    description: "시작 위도",
    example: 10.0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  startLatitude: number;

  @ApiProperty({
    description: "시작 경도",
    example: 10.0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  startLongitude: number;

  @ApiProperty({
    description: "도착 위도",
    example: 10.1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  arrivalLatitude: number;

  @ApiProperty({
    description: "도착 경도",
    example: 10.1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  arrivalLongitude: number;

  @ApiProperty({
    description: "사용 유저 UID",
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  usersId: number;

  @ApiProperty({
    description: "기사 ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ridersId: number;
}
