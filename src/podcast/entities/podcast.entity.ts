import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@ObjectType()
export class Podcast {
  @Field((_) => Number)
  @IsNumber()
  id: number;
  @Field((_) => String)
  @IsString()
  title: string;
  @Field((_) => String)
  @IsString()
  category: string;
  @Field((_) => Number)
  @IsNumber()
  rating: number;
  @Field((_) => [Episode])
  episodes: Episode[];
}
