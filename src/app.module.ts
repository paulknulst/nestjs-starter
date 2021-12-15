import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm/dist/typeorm.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NotesModule} from './notes/notes.module';
import {AdminauthMiddleware} from './auth/adminauth.middleware';
import {SubscriptionsModule} from './subscriptions/subscriptions.module';
import {UsersModule} from './users/users.module';
import {UsersController} from "./users/users.controller";
import {ModulesModule} from './modules/modules.module';
import {GraphQLModule} from "@nestjs/graphql";
import {AuthModule} from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [
    NotesModule,
    AuthModule,
    SubscriptionsModule,
    UsersModule,
    ModulesModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    })
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AdminauthMiddleware).forRoutes(UsersController);
  }
}
