// import { Exclude, Expose, Transform } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn()
  version: number;
}

//비노출 시키기
// @Exclude()
@Entity()
//선언을 해줘야 table 생성이 됨
export class Movie extends BaseEntity {
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

  //Entity Embeding
  //   @Column(() => BaseEntity)
  //   base: BaseEntity;
}
