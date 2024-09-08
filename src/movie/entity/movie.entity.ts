import { Exclude, Expose, Transform } from 'class-transformer';

//비노출 시키기
// @Exclude()
export class Movie {
  //노출시키기
//   @Expose()
  id: number;
//   @Expose()
  title: string;
  @Transform(({ value }) => value.toString().toUpperCase())
  genre: string;
}
