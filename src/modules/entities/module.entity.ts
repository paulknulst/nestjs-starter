import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Module extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({readOnly: true})
    uid: string;

    @ApiProperty({nullable: true})
    @Column({nullable: true})
    name: string;
}
