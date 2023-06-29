import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class NoticesUpdateDto {
  @ApiProperty({
    description: "notice 제목",
    example: "공지다",
    required: true,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: "notice 생성 일자",
    example: "2023.06.29",
    required: true,
  })
  @IsOptional()
  @IsString()
  date: string;

  @ApiProperty({
    description: "notice 내용",
    example: "<html>...</html>",
    required: true,
  })
  @IsOptional()
  @IsString()
  value: string;
}
