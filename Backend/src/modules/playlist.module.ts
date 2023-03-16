import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistService } from '../services/playlist/playlist.service';
import { PlaylistController } from '../controllers/playlist/playlist.controller';
import { SeedService } from '../services/seed.service';
import { Playlist } from '../model/playlist/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
  ],
  providers: [PlaylistService, SeedService],
  controllers: [PlaylistController],
  exports: [],
})
export class PlaylistModule {}
