import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode {
  @Field((_) => Number)
  @PrimaryColumn()
  id: number;
  @Field((_) => String)
  @Column()
  title: string;
  @Field((_) => String)
  @Column()
  category: string;
}
