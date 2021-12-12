import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from "../../users/entities/user.entity";

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({readOnly: true})
  uid: string;

  @Column({type: 'simple-array', nullable: true})
  @ApiProperty({type: [String]})
  modules: string[]; //string array based uid, see Module.moduleKeys

  @ApiProperty({nullable: true})
  @Column({nullable: true})
  sub_type: string;

  @ManyToOne(
      type => User,
      user => user.subscriptions,
  )
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
