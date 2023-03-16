import { Body, Controller, Get, HttpCode, Param, Post, Req, Res } from "@nestjs/common";
import { PlaylistService } from '../../services/playlist/playlist.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateListDto } from '../../dtos/create-list.dto';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private service: PlaylistService) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'fetching all play lists' })
  public async getPlayLists(@Req() req, @Res() res) {
    try {
      const response = await this.service.getAll();

      res.status(200).json({
        status: 'Success',
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Error',
        message: error.message,
      });
    }
  }

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'create new play list' })
  public async createPlayList(@Req() req, @Res() res, @Body() createListDto: CreateListDto) {
    try {
      const response = await this.service.create(createListDto);
      res.status(200).json({
        status: 'Success',
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Error',
        message: error.message,
      });
    }
  }

  @Post('/play/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'play music' })
  public async playMusic(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const response = await this.service.play(id);
      res.status(200).json({
        status: 'Success',
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Error',
        message: error.message,
      });
    }
  }
}
