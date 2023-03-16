import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  totalTime: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  artistInfoName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  visited: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
