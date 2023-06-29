import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class EvlasCreateDto {
    @ApiProperty({
        description: "rider 고유 식별 번호",
        example: 123,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    // 외래키 설정 필요
    rider: number;
    
    @ApiProperty({
        description: "user 고유 식별 번호",
        example: 123,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    // 외래키 설정 필요
    user: number;
    
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
