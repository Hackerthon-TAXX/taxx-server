import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EvlasCreateDto {
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

  @ApiProperty({
    description: "사용자가 평가한 평점",
    example: 3.5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @ApiProperty({
    description: "사용자가 남긴 평가",
    example: "빠르고 좋아요~",
    required: false,
  })
  @IsOptional()
  @IsString()
  comment: string;
}
