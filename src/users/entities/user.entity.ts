import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {MaxLength, MinLength} from 'class-validator';
import {Subscription} from "../../subscriptions/entities/subscription.entity";
import {Note} from "../../notes/note.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({readOnly: true})
    uid: string;

    @ApiProperty()
    @Column({length: 150})
    @MinLength(1)
    @MaxLength(150)
    name: string;

    @ApiProperty()
    @Column({length: 1})
    @MinLength(1)
    @MaxLength(1)
    gender: string;

    @OneToMany(
        type => Subscription,
        subscription => subscription.user,
        {cascade: ['insert', 'update']},
    )
    @ApiProperty({
        type: () => [Subscription],
    })
    subscriptions: Subscription[];

    @OneToMany(
        type => Note,
        note => note.user,
        {cascade: ['insert', 'update']},
    )
    @ApiProperty({
        type: () => [Note],
    })
    notes: Note[];
}
