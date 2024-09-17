// import { Exclude, Expose, Transform } from 'class-transformer';

import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

///movie / serires -> content
///runtime(영화 사영시간)/ seriesCount (몇부작인지)

export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn()
  version: number;
}
@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'type',
  },
})
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  genre: string;
}

//비노출 시키기
// @Exclude()
// @Entity()
@ChildEntity()
//선언을 해줘야 table 생성이 됨
export class Movie extends Content {
  //노출시키기
  //   @Expose()
  //   @PrimaryGeneratedColumn()
  //   id: number;
  //   //   @Expose()
  //   @Column()
  //   title: string;
  //   //   @Transform(({ value }) => value.toString().toUpperCase())
  //   @Column()
  //   genre: string;
  @Column()
  runtime: number;
  //Entity Embedding
  //   @Column(() => BaseEntity)
  //   base: BaseEntity;
}
@ChildEntity()
export class series extends Content {
  //   @PrimaryGeneratedColumn()
  //   id: number;
  //   //   @Expose()
  //   @Column()
  //   title: string;
  //   //   @Transform(({ value }) => value.toString().toUpperCase())
  //   @Column()
  //   genre: string;
  @Column()
  seriesCount: number;
}
