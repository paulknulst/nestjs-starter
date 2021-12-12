import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class ModuleInput {
    @Field()
    readonly name: string;
}
