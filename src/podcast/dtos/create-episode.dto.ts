import { CreatePodcastDto } from './create-podcast.dto';
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { PodcastSearchInput } from './podcast.dto';
@InputType()
export class CreateEpisodeDto extends PodcastSearchInput {
  @Field((_) => String)
  @IsString()
  readonly title: string;

  @Field((_) => String)
  @IsString()
  readonly category: string;
}
