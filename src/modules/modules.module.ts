import {Module as NestModule} from '@nestjs/common';
import {ModulesService} from './modules.service';
import {ModulesController} from './modules.controller';
import {ModulesResolver} from './modules.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "./entities/module.entity";

@NestModule({
    imports: [TypeOrmModule.forFeature([Module])],
    controllers: [ModulesController],
    providers: [ModulesService, ModulesResolver]
})
export class ModulesModule {
}
