import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') uid: string) {
    return this.modulesService.findOne(uid);
  }

  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(uid, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') uid: string) {
    return this.modulesService.remove(uid);
  }
}
