import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/domains/users/users.module';
import { User } from 'src/domains/users/entities/user.entity';
import configuration from 'src/core/config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/core/auth/guard/jwt.guard';
import { AuthModule } from 'src/core/auth/auth.module';
import { ChatbotModule } from 'src/domains/chatbot/chatbot.module';
import { UuidMiddleware } from 'src/core/middleware/uuid.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: 'horashi_api',
        entities: [User],
        synchronize: true,
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),


    UsersModule,
    AuthModule,
    ChatbotModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UuidMiddleware)
      .forRoutes('*'); // Áp dụng cho tất cả các routes
  }
 }
