import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';

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
  @Field((_) => [Episode])
  @ManyToMany(type => Episode)
  @JoinTable()
  episodes: Episode[];
}
