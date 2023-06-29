import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RidersEvalsDto {
  @ApiProperty({
    description: "Rider의 평점의 총합",
    example: 123,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: "Rider의 평가 개수",
    example: 123,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
