import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RidersMoveDto {
  @ApiProperty({
    description: "Rider의 위도",
    example: 37.1231321,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: "Rider의 경도",
    example: 123.1231321,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
