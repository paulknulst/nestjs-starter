import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {ParseIntPipe} from '@nestjs/common/pipes/parse-int.pipe';
import {SubscriptionsService} from './subscriptions.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {UpdateSubscriptionDto} from "./dto/update-subscription.dto";

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
  findOne(@Param('id', ParseIntPipe) id) {
    return this.subscriptionsService.findOne(id);
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
      @Param('id') id: number,
  ) {
    return await this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id) {
    await this.subscriptionsService.remove(id);
  }
}
