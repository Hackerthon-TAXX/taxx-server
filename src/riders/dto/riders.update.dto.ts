import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class RidersUpdateDto {
    @ApiProperty({
        description: "기사 이미지",
        example: "https://asdasdadsasd.com/asdadadasd",
        required: false,
    })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({
        description: "Rider의 위도",
        example: 37.1231321,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    latitude: number;

    @ApiProperty({
        description: "Rider의 경도",
        example: 123.1231321,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    longitude: number;

    @ApiProperty({
        description: "Rider의 평점의 총합",
        example: 123,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    sum: number;

    @ApiProperty({
        description: "Rider의 평가 개수",
        example: 123,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    count: number;
}
