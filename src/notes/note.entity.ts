import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {User} from "../user/entities/user.entity";

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({readOnly: true})
  id: number;

  @Column({length: 150})
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

  @ManyToOne(
      type => User,
      user => user.notes,
  )
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
