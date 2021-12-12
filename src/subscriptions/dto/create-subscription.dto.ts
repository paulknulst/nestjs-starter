import {ApiProperty} from '@nestjs/swagger';
import {User} from "../../users/entities/user.entity";

export class CreateSubscriptionDto {
    @ApiProperty({type: [String]})
    modules: string[];
    @ApiProperty({nullable: true})
    sub_type: string;
    @ApiProperty({
        type: () => User,
    })
    user: User;
}
