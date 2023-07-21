import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

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

  // "Podcast" 엔티티와의 다대일 관계 설정
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    nullable: true,
    onDelete: 'CASCADE', //연결된 podcast가 삭제되면 같이 삭제
  })
  podcast: Podcast;
}
