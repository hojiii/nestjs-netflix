import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule], // 또다른 모듈을 현재 모듈로 불러들일때
  // exports: [], // import된 모듈에서 사용됬으면 하는 것을 넣으면 됨
  controllers: [],
  providers: [], //inject 해줄수 있는 기능을 넣는다
})
export class AppModule {}
