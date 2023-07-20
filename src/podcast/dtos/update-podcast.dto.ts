import { PodcastSearchInput } from './podcast.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@InputType({ isAbstract: true })
@ObjectType()
export class UpdatePodcastDto extends PodcastSearchInput {
  @Field((_) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @Field((_) => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;

  @Field((_) => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field((_) => [Episode], { nullable: true })
  episodes?: Episode[];
}
