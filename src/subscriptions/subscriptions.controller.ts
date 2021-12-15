import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {ParseIntPipe} from '@nestjs/common/pipes/parse-int.pipe';
import {SubscriptionsService} from './subscriptions.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {UpdateSubscriptionDto} from "./dto/update-subscription.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('subscriptions')
@ApiTags('subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') uid) {
    return this.subscriptionsService.findOne(uid);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateSubscriptionDto,
  })
  async create(@Body() subscription: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(subscription);
  }

  @Patch(':id')
  async update(
      @Body() updateSubscriptionDto: UpdateSubscriptionDto,
      @Param('id') uid: string,
  ) {
    return await this.subscriptionsService.update(uid, updateSubscriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') uid) {
    await this.subscriptionsService.remove(uid);
  }
}
