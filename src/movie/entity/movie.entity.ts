// import { Exclude, Expose, Transform } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

//비노출 시키기
// @Exclude()
@Entity()
//선언을 해줘야 table 생성이 됨
export class Movie {
  //노출시키기
  //   @Expose()
  @PrimaryGeneratedColumn()
  id: number;
  //   @Expose()
  @Column()
  title: string;
  //   @Transform(({ value }) => value.toString().toUpperCase())
  @Column()
  genre: string;
  //특수 칼럼
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn()
  version: number;
}
