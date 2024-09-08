import { Exclude, Expose } from 'class-transformer';

//비노출 시키기
@Exclude()
export class Movie {
  //노출시키기
  @Expose()
  id: number;
  @Expose()
  title: string;
  genre: string;
}
