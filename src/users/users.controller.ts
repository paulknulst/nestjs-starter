import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {User} from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  @ApiCreatedResponse({
    description: 'creates a new users',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') uid: string) {
    return this.userService.findOne(uid);
  }

  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') uid: string) {
    return this.userService.remove(uid);
  }
}
