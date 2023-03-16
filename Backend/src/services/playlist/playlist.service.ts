import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Playlist } from "../../model/playlist/playlist.entity";
import { CreateListDto } from "../../dtos/create-list.dto";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly repository: Repository<Playlist>,
  ) {}

  public async getAll() {
    try {
      return await this.repository.find({order: { visited: "DESC" }});
    } catch (error) {
      throw new HttpException(
        'Fetching activities is failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async create(createDto: CreateListDto): Promise<Playlist> {
    const list = new Playlist();
    Object.assign(list, createDto);
    const createdList = this.repository.create(list);
    return await this.repository.save(createdList);
  }

  public async play(id: string): Promise<Playlist[]> {
    const list = await this.repository.findOne({ where: { id } });
    if (list) {
      Object.assign(list, { visited: list.visited + 1 });
      const createdList = this.repository.create(list);
      await this.repository.save(createdList);
    } else {
      throw new BadRequestException('Play List not found!');
    }

    return await this.repository.find({order: { visited: "DESC" }});
  }
}
