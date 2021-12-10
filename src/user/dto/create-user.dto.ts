import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../../subscription/entities/subscription.entity';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty({
    type: () => [Subscription],
  })
  subscriptions: Subscription[];
}
