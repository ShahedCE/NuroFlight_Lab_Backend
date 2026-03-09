import { Column, Entity, Index } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';

@Entity('publications')
export class Publication extends BaseEntityWithTimestamps {
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 220,
    unique: true, 
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  title: string;

  @Column({
    type: 'text', // authors string 
  })
  authors: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  venue: string;

  @Column({
    type: 'int',
  })
  year: number;

  @Column({
    type: 'text',
  })
  abstract: string;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  tags: string[];

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  paperUrl?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  pdfUrl?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  doiUrl?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  codeUrl?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  bibtex?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  relatedProjectSlugs?: string[];
}