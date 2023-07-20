import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePodcastDto {
  @Field((_) => String)
  @IsString()
  readonly title: string;

  @Field((_) => String)
  @IsString()
  readonly category: string;
}
