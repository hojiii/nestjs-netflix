// import { Exclude, Expose, Transform } from 'class-transformer';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTable } from './base-table.entity';
import { MovieDetail } from './movie-detail.entity';

///ManyToOne Director -> 감독은 여러개의 영화를 만들 수 있음
///OneToOne MovieDetail -> 영화는 하나의 상세 내용을 갖을 수 있음
///ManyToMany Genre -> 영화는 여러개의 장르, 장르는 여러개의 영화애 속할 수 있음

///SingleTableInheritance
///movie / serires -> content
///runtime(영화 사영시간)/ seriesCount (몇부작인지)
// @Entity()
// @TableInheritance({
//   column: {
//     type: 'varchar',
//     name: 'type',
//   },
// })
// export class Content extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column()
//   title: string;
//   @Column()
//   genre: string;
// }

//비노출 시키기
// @Exclude()
@Entity()
//선언을 해줘야 table 생성이 됨
export class Movie extends BaseTable {
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
  // @Column()
  // runtime: number;

  @OneToOne(() => MovieDetail)
  @JoinColumn()
  detail: MovieDetail;
  //Entity Embedding
  //   @Column(() => BaseEntity)
  //   base: BaseEntity;
}
// @Entity()
// export class series extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
//   //   @Expose()
//   @Column()
//   title: string;
//   //   @Transform(({ value }) => value.toString().toUpperCase())
//   @Column()
//   genre: string;
//   @Column()
//   seriesCount: number;
// }
