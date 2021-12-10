import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  @ApiProperty({ example: 'Supertitel', description: 'der titel der note' })
  title: string;

  @Column()
  @MinLength(1)
  @IsString()
  @ApiProperty({
    example: 'geschichte bla bla',
    description: 'die beschreibung der note',
  })
  description: string;
}
