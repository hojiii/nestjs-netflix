import {
  Equals,
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmpty,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';

enum MovieGenre {
  Fantasy = 'fantasy',
  Action = 'action',
}

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;
  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  //null || undefind 이면 에러반환
  // @IsDefined()
  //애초에 값이 정의 안되어있으면 가능하게 옵셔널 역할
  // @IsOptional()
  //입력된 값과 같아야지만 성공
  // @Equals('hojji')
  //입력된 값과 달라야지만 성공
  // @NotEquals('hojji')
  //null || undefind || '' 성공
  // @IsEmpty()
  //null || undefind || '' 에러
  // @IsNotEmpty()
  //array 안의 값 중 하나여야된다.
  // @IsIn(['action', 'fantasy'])
  //array 안의 값이 아니여야된다.
  // @IsNotIn(['action', 'fantasy'])
  //불리언 값만 성공
  // @IsBoolean()
  //스트링 성공
  // @IsString()
  //숫자 성공
  // @IsNumber()
  //정수 성공
  // @IsInt()
  //배열이면 성공
  // @IsArray()
  //enum에 포함된 값만 성공
  // @IsEnum(MovieGenre)
  @IsDateString()
  test: string;
}
