import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, Tconfigutation } from '../configuration';
import { LoggerMiddleware } from '@commom/middlewares/logger.middleware';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    static CONFIGURATION: Tconfigutation = CONFIGURATION;

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
