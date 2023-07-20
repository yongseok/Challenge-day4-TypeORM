import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { EpisodesSearchInput } from './podcast.dto';

@InputType()
export class UpdateEpisodeDto extends EpisodesSearchInput {
  @Field((_) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @Field((_) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly category?: string;
}
