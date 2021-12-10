import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {MaxLength, MinLength} from 'class-validator';
import {Subscription} from "../../subscription/entities/subscription.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({readOnly: true})
    uid: number;

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
}
