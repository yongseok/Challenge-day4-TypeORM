import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field((_) => Number)
  id: number;
  @Field((_) => String)
  title: string;
  @Field((_) => String)
  category: string;
}
