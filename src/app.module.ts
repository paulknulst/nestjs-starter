import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm/dist/typeorm.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NotesModule} from './notes/notes.module';
import {AuthMiddleware} from './auth/auth.middleware';
import {NotesController} from './notes/notes.controller';
import {AdminauthMiddleware} from './auth/adminauth.middleware';
import {SubscriptionsController} from './subscription/subscriptions.controller';
import {SubscriptionsModule} from './subscription/subscriptions.module';
import {UsersModule} from './user/users.module';
import {UsersController} from "./user/users.controller";

@Module({
  imports: [TypeOrmModule.forRoot(), NotesModule, SubscriptionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(NotesController);
    consumer.apply(AdminauthMiddleware).forRoutes(SubscriptionsController, UsersController);
  }
}
