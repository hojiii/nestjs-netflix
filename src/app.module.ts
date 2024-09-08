import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //데이터 베이스 연동
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      //개발할때만 true , 운영은 false 자동으로 코드와 맞게 데이터베이스를 싱크를 시키라는것
      synchronize: true,
    }),
    MovieModule,
  ], // 또다른 모듈을 현재 모듈로 불러들일때
  // exports: [], // import된 모듈에서 사용됬으면 하는 것을 넣으면 됨
  controllers: [],
  providers: [], //inject 해줄수 있는 기능을 넣는다
})
export class AppModule {}
