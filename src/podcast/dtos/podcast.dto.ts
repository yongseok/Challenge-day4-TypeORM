import { ArgsType, Field, ObjectType, InputType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';
import { Podcast } from '../entities/podcast.entity';
import { IsNumber } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@InputType()
export class PodcastSearchInput {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  episodes?: Episode[];
}

@InputType()
export class EpisodesSearchInput {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;

  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}
