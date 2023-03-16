import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../model/playlist/playlist.entity';
import { seedPlayLists } from '../data/seed'

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,
  ) {}

  async run() {
    for(const list of seedPlayLists) {
      const playLists = await this.playListRepo.create({
        name: list.name,
        totalTime: list.totalTime,
        artist: list.artist,
        tag: list.summary.tag,
        title: list.summary.title,
        artistInfoName: list.summary.name,
        description: list.summary.description,
        visited: 0
      });

      await playLists.save();
    }
  }
}
