import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ModulesService} from "./modules.service";
import {Module} from "./entities/module.entity";
import {ModuleInput} from "./module.input";
import {ModuleModel} from "./models/module.model";

@Resolver(of => ModuleModel)
export class ModulesResolver {
    constructor(private readonly moduleService: ModulesService) {
    }

    @Query(returns => [ModuleModel])
    async modules(): Promise<Module[]> {
        return this.moduleService.findAll();
    }

    @Query(returns => ModuleModel)
    async module(@Args('id', {type: () => String}) uid: string) {
        return this.moduleService.findOne(uid)
    }

    @Mutation(returns => ModuleModel)
    async createModule(@Args('input') input: ModuleInput): Promise<ModuleModel> {
        return this.moduleService.create(input);
    }

    @Mutation(returns => ModuleModel)
    async updateModule(
        @Args('id') id: string,
        @Args('input') input: ModuleInput,
    ) {
        return this.moduleService.update(id, input as ModuleModel);
    }

    @Mutation(returns => ModuleModel)
    async removeModule(@Args('id') id: string) {
        return this.moduleService.remove(id);
    }

    @Query(returns => String)
    async hello() {
        return 'hello';
    }
}
