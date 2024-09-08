import {
  // Contains,
  // Equals,
  // IsAlphanumeric,
  // IsArray,
  // IsBoolean,
  // IsCreditCard,
  // IsDateString,
  // IsDefined,
  // IsEmpty,
  // IsEnum,
  // IsHexColor,
  // IsIn,
  // IsInt,
  // IsLatLong,
  // IsNegative,
  IsNotEmpty,
  // IsNotIn,
  // IsNumber,
  IsOptional,
  // IsPositive,
  // isPositive,
  // IsString,
  // IsUUID,
  // Max,
  // MaxLength,
  // Min,
  // MinLength,
  // NotContains,
  // NotEquals,
  // registerDecorator,
  // Validate,
  // ValidationArguments,
  // ValidationOptions,
  // Validator,
  // ValidatorConstraint,
  // ValidatorConstraintInterface,
} from 'class-validator';

// enum MovieGenre {
//   Fantasy = 'fantasy',
//   Action = 'action',
// }
// @ValidatorConstraint({async: true}) 동기로도 사용가능
// @ValidatorConstraint()
// class PasswordValidator implements ValidatorConstraintInterface {
//   validate(
//     value: any,
//     validationArguments?: ValidationArguments,
//   ): Promise<boolean> | boolean {
//       //비밀번호 길이는 4-8
//       return value.length > 4 && value.length < 8;
//   }
//   defaultMessage(validationArguments?: ValidationArguments): string {
//     return `비밀번호의 길이는 5-8자 여야합니다. 입력된 비밀번호: ($value)`;
//   }
// }

// function IsPasswordValid(validationOption?: ValidationOptions){
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName,
//       options: validationOption,
//       validator: PasswordValidator,
//     });
//   }
// }

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
  //YYYY-MM-DDTHH:MM:SS.SSSz(utctime)
  // @IsDateString()
  //가로 안의 수로 나눠지는값
  // @IsdDivisibleBy(5)
  //양수인가
  // @IsPositive()
  //음수인가
  // @IsNegative()
  //최대값
  // @Max(100)
  //최솟값
  // @Min(0)
  //가로안의 글자가 들어있어야함
  // @Contains('hojji')
  //가로안의 글자가 들어가지않아야함
  // @NotContains
  //숫자와 알파벳으로만 이루어져있어야함
  // @IsAlphanumeric()
  //xxxx-xxxx-xxxx-xxxx 실제 존재할수있는 카드번호가 들어왔냐 정도만 체크
  // @IsCreditCard()
  //6글자로 사용된 색상
  // @IsHexColor()
  //16개보다 적게
  // @MaxLength(16)
  //4보다 많게
  // @MinLength(4)
  //UUID 형태의 맞게
  // @IsUUID()
  //위도 경도에 맞게
  // @IsLatLong()
  // @Validate(PasswordValidator,{
  //   message: '다른에러 메세지',
  // })
  // @IsPasswordValid()
  test: string;
}
