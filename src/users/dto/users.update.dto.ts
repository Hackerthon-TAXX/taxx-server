import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class UsersUpdateDto {
  @ApiProperty({
    description: "유저 이름",
    example: "김관식",
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: "결제수단",
    example: { logo: "kakao", label: "카카오뱅크 1234" },
    required: false,
  })
  @IsOptional()
  @IsObject()
  payments: string;
}
