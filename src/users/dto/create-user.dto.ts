import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

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
