import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateModuleDto} from './dto/create-module.dto';
import {UpdateModuleDto} from './dto/update-module.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Module} from "./entities/module.entity";

@Injectable()
export class ModulesService {
    constructor(@InjectRepository(Module)
                private moduleRepository: Repository<Module>) {
    }

    async create(createModuleDto: CreateModuleDto) {
        return this.moduleRepository.save(createModuleDto);
    }

    async findAll() {
        return await this.moduleRepository.find()
    }

    async findOne(uid: string) {
        return this.moduleRepository.findOne(uid);
    }

    async update(uid: string, updateModuleDto: UpdateModuleDto) {
        const updateModule = await this.moduleRepository.findOne(uid);
        if (!updateModule) {
            throw new NotFoundException('Module not found');
        }
        updateModule.name = updateModuleDto.name;
        await updateModule.save();
        return updateModule;
    }

    async remove(uid: string) {
        await this.moduleRepository.delete(uid);
    }
}
