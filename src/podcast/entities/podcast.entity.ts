import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Entity, Column, OneToMany, JoinTable, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Podcast {
  @Field((_) => Number)
  @IsNumber()
  @PrimaryColumn()
  id: number;
  @Field((_) => String)
  @IsString()
  @Column()
  title: string;
  @Field((_) => String)
  @IsString()
  @Column()
  category: string;
  @Field((_) => Number)
  @IsNumber()
  @Column()
  rating: number;
  // "Episode" 엔티티와의 일대다 관계를 설정합니다.
  @Field(() => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
