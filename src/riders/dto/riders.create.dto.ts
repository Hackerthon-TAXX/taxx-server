import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class RidersCreateDto {
    @ApiProperty({
        description: "Rider의 고유 ID",
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "Rider의 프로필 사진 URL",
        example: "https://asdasdasd.com",
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
