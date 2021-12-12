import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Subscription} from "./entities/subscription.entity";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {UpdateSubscriptionDto} from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionsService {
  constructor(
      @InjectRepository(Subscription)
      private subscriptionsRepository: Repository<Subscription>,
  ) {
  }

  async findAll() {
    return await this.subscriptionsRepository.find();
  }

  findOne(uid: string) {
    return this.subscriptionsRepository.findOne(uid, {relations: ['user']});
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.save(createSubscriptionDto);
  }

  async remove(uid: string): Promise<void> {
    await this.subscriptionsRepository.delete(uid);
  }

  async update(
      uid: string,
      updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const updateSubscription = await this.subscriptionsRepository.findOne(uid);
    if (!updateSubscription) {
      throw new NotFoundException('Subscription is not found');
    }
    updateSubscription.sub_type = updateSubscriptionDto.sub_type;
    updateSubscription.modules = updateSubscriptionDto.modules;
    await updateSubscription.save();
    return updateSubscription;
  }
}
