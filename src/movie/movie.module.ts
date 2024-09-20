import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { MovieDetail } from './entity/movie-detail.entity';

@Module({
  imports: [
    //TypeOrm에서 forFeature 배열안에 쓰고싶은 entity를 넣으면 자동으로 레포지토리를 만들어서 쓰고싶은곳에 inject를 해준다.
    TypeOrmModule.forFeature([Movie, MovieDetail]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
