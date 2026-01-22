import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CONFIGURATION, Tconfigutation } from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { LoggerMiddleware } from '@commom/middlewares/logger.middleware';
import { ProductModule } from '../modules/product/product.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }), ProductModule],
    controllers: [],
    providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {
    static CONFIGURATION: Tconfigutation = CONFIGURATION;

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
