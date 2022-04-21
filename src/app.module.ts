import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigModule specifies which config file to read. COnfigService exposes the information inside those files to the rest of our application
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session');

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

// NOTE: We moved wiring up of middlewares and pipes from main.ts to AppModule, because e2e test initilises an instance of AppModule not main.ts

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to re-import in any other module to get config information
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [User, Report],
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE, // whenever we create an instace of this module, automatically make use of this pipe on every incoming request that flows into our application
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  // this confige method is called automatically whenever our application starts listnening for incoming traffic
  configure(consumer: MiddlewareConsumer) {
    // stup some middlewares
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')], // key used to ecyrpt the cookie
        }),
      )
      .forRoutes('*'); // apply this middleware for every single incoming request that flows into our entire application
  }
}
