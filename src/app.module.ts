import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm/dist/typeorm.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NotesModule} from './notes/notes.module';
import {AuthMiddleware} from './auth/auth.middleware';
import {NotesController} from './notes/notes.controller';
import {AdminauthMiddleware} from './auth/adminauth.middleware';
import {SubscriptionsController} from './subscriptions/subscriptions.controller';
import {SubscriptionsModule} from './subscriptions/subscriptions.module';
import {UsersModule} from './users/users.module';
import {UsersController} from "./users/users.controller";
import {ModulesModule} from './modules/modules.module';
import {GraphQLModule} from "@nestjs/graphql";

@Module({
  imports: [TypeOrmModule.forRoot(), NotesModule, SubscriptionsModule, UsersModule, ModulesModule, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(NotesController);
    consumer.apply(AdminauthMiddleware).forRoutes(SubscriptionsController, UsersController);
  }
}
