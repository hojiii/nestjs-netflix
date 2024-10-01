/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';

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
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
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

  async findAll(title?: string) {
    if (!title) {
      return [
        await this.movieRepository.find({
          relations: ['director'],
        }),
        await this.movieRepository.count(),
      ];
    }
    return this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
      relations: ['director'],
    });
    //TODO:나중에 title 필터 기능 추가하기
    //  if (!title) {
    //     return this.movies;
    //   }
    //   return this.movies.filter((m) => m.title.startsWith(title));
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail', 'director'], //특정 값을 가져와서 보여주고싶을때 해당 프로퍼티를 넣는다
    });
    //   const movie = this.movies.find((m) => m.id === id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto) {
    // const movieDetail = await this.moviedetailRepository.save({
    //   detail: createMovieDto.detail,
    // });

    const director = await this.directorRepository.findOne({
      where: {
        id: createMovieDto.directorId,
      },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID의 감독입니다.');
    }
    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      detail: { detail: createMovieDto.detail },
      director,
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

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail'],
    });

    // const movie = this.movies.find((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }

    const { detail, directorId, ...movieRest } = updateMovieDto;

    let newDirector;

    if (directorId) {
      const director = await this.directorRepository.findOne({
        where: {
          id: directorId,
        },
      });
      if (!director) {
        throw new NotFoundException('존재하지 않는 ID값의 감독입니다.');
      }
      newDirector = director;
    }
    const movieUpdateFields = {
      ...movieRest,
      ...(newDirector && { director: newDirector }),
    };

    await this.movieRepository.update({ id }, movieUpdateFields); //덮어씌우기 해당Id의 데이터

    if (detail) {
      await this.moviedetailRepository.update(
        {
          id: movie.detail.id,
        },
        {
          detail,
        },
      );
    }
    const newMovie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail', 'director'],
    }); //업데이트된 해당 아이디 찾아서 반환,업데이트 함수는 저장한 값을 반환해주지 않기때문에
    // Object.assign(movie, updateMovieDto); //덮어씌우기
    return newMovie;
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail'],
    });
    // const movieIndex = this.movies.findIndex((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID값의 입력입니다.');
    }
    await this.movieRepository.delete(id);
    await this.moviedetailRepository.delete(movie.id);
    // this.movies.splice(movieIndex, 1);
  }
}
