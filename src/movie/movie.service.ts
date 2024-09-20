import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';

@Injectable()
export class MovieService {
  //데이터 베이스를 inject해서 더미 필요없음
  // private movies: Movie[] = [];
  // private idCounter = 3;

  constructor(
    //아래처럼 하면 module에 forFeature에 넣었기때문에 자동으로 받을 수 있다(inject)
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly moviedetailRepository: Repository<MovieDetail>,
  ) {
    //데이터 베이스를 inject해서 더미 필요없음
    // const movie1 = new Movie();
    // movie1.id = 1;
    // movie1.title = '해리포터';
    // movie1.genre = 'fantasy';
    // const movie2 = new Movie();
    // movie2.id = 2;
    // movie2.title = '반지의 제완';
    // movie2.genre = 'action';
    // this.movies.push(movie1, movie2);
  }

  async getManyMovies(title?: string) {
    if (!title) {
      return [
        await this.movieRepository.find(),
        await this.movieRepository.count(),
      ];
    }
    return this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
    });
    //TODO:나중에 title 필터 기능 추가하기
    //  if (!title) {
    //     return this.movies;
    //   }
    //   return this.movies.filter((m) => m.title.startsWith(title));
  }

  async getMovieByID(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail'], //특정 값을 가져와서 보여주고싶을때 해당 프로퍼티를 넣는다
    });
    //   const movie = this.movies.find((m) => m.id === id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }
    return movie;
  }

  async creatMovie(createMovieDto: CreateMovieDto) {
    const movieDetail = await this.moviedetailRepository.save({
      detail: createMovieDto.detail,
    });
    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      detail: movieDetail,
    });

    // const movie: Movie = {
    //   id: this.idCounter++,
    //   ...CreateMovieDto,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   version: 0,
    // };
    // this.movies.push(movie);
    return movie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    // const movie = this.movies.find((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }
    await this.movieRepository.update({ id }, updateMovieDto); //덮어씌우기 해당Id의 데이터

    const newMovie = await this.movieRepository.findOne({
      where: {
        id,
      },
    }); //업데이트된 해당 아이디 찾아서 반환,업데이트 함수는 저장한 값을 반환해주지 않기때문에
    // Object.assign(movie, updateMovieDto); //덮어씌우기
    return newMovie;
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });
    // const movieIndex = this.movies.findIndex((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }
    await this.movieRepository.delete(id);
    // this.movies.splice(movieIndex, 1);
  }
}
