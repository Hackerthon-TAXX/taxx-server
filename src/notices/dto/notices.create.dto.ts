import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NoticesCreateDto {
    @ApiProperty({
        description: "notice 제목",
        example: "공지다",
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: "notice 생성 일자",
        example: "2023.06.29",
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({
        description: "notice 내용",
        example: "<html>...</html>",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    value: string;
}
