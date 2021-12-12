import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class ModuleModel {

    @Field(type => ID)
    uid: string;

    @Field()
    name: string;
}