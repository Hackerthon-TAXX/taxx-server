import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

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
    example: [
      { type: "kakao", label: "카카오뱅크 1234" },
      { type: "ApplePay", label: "현대카드 486" },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  payments: Array<Object>;
}
