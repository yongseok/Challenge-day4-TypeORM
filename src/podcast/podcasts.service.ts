import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
} from './dtos/podcast.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastsRepo: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly EpisodeRepo: Repository<Episode>,
  ) {}

  private podcasts: Podcast[] = [];

  async getAllPodcasts(): Promise<Podcast[]> {
    return await this.podcastsRepo.find({
      relations: ['episodes'],
    });
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastDto): Promise<PodcastOutput> {
    try {
      const newPodcast = await this.podcastsRepo.create({
        title,
        category,
        rating: 0,
        episodes: [],
      });
      this.podcastsRepo.save(newPodcast);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastsRepo.findOne(id, {
        relations: ['episodes'], //NOTE: 관계 설정(검색 시 episode 같이 조회)
      });
      console.log('podcast:', podcast);
      return {
        ok: true,
        podcast,
      };
    } catch (e) {
      return { ok: false, podcast: null };
    }
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      await this.podcastsRepo.delete(id);
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  async updatePodcast({ id, ...rest }: UpdatePodcastDto): Promise<CoreOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }

      const newEpisode = await this.EpisodeRepo.save(rest.episodes);
      podcast.episodes.push(...newEpisode);
      delete rest.episodes;

      await this.podcastsRepo.save({ ...podcast, ...rest });
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const podcast = await this.podcastsRepo.findOne(podcastId, {
        relations: ['episodes'], //NOTE:
      });
      return {
        ok: true,
        episodes: podcast.episodes,
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getEpisode(
    podcastId: number,
    episodeId: number,
  ): Promise<{ ok: boolean; error?: string; episode: Episode | null }> {
    try {
      const episode = await this.EpisodeRepo.findOne(episodeId, {
        relations: ['podcast'],
        where: {
          podcast: {
            id: podcastId,
          },
        },
      });
      console.log('episode:', episode);
      return { ok: true, episode };
    } catch (error) {
      return { ok: false, error, episode: null };
    }
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<CoreOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }

      await this.EpisodeRepo.save(
        this.EpisodeRepo.create({
          title,
          category,
          podcast,
        }),
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    const { ok, error, episode } = await this.getEpisode(podcastId, episodeId);
    if (!ok) {
      return { ok, error };
    }
    await this.EpisodeRepo.delete(episode);

    return { ok: true };
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    const { ok, error, episode } = await this.getEpisode(podcastId, episodeId);
    if (!ok) {
      return { ok, error };
    }

    try {
      await this.EpisodeRepo.save({
        ...episode,
        ...rest,
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
