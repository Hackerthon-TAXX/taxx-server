import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RidersCreateDto {
  @ApiProperty({
    description: "기사 이름",
    example: "김관식",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Rider의 프로필 사진 URL",
    example: "https://abc.com",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    description: "Rider의 경도",
    example: 37.123123,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: "Rider의 위도",
    example: 128.123123,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: "Rider의 평점 총합",
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: "Rider의 평가 개수",
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
