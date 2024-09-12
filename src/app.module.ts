import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Movie } from './movie/entity/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //어떤 모듈에서도 configmodule에 등록된 환경변수를 쓸수 있게 해주는것
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'prod').required(), //스트링인데 필수값
        DB_TYPE: Joi.string().valid('postgres').required(), //,valid는 연결할 데이터 베이스 설정가능
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    //비동기인 이유: configModule이 인스터스화(생성) 된 후 configModule를 TypeOrmModule에 infject할꺼기때문에
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Movie],
        //개발할때만 true , 운영은 false 자동으로 코드와 맞게 데이터베이스를 싱크를 시키라는것
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    //데이터 베이스 연동
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE as 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [],
    //   //개발할때만 true , 운영은 false 자동으로 코드와 맞게 데이터베이스를 싱크를 시키라는것
    //   synchronize: true,
    // }),
    MovieModule,
  ], // 또다른 모듈을 현재 모듈로 불러들일때
  // exports: [], // import된 모듈에서 사용됬으면 하는 것을 넣으면 됨
  controllers: [],
  providers: [], //inject 해줄수 있는 기능을 넣는다
})
export class AppModule {}
