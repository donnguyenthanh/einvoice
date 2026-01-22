import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';

export enum TCP_SERVICE {
    INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
}

export class TcpConfiguration {
    @IsNotEmpty()
    @IsObject()
    TCP_INVOICE_SERVICE: TcpClientOptions;

    constructor() {
        Object.entries(TCP_SERVICE).forEach(([key, serviceName]) => {
            // Use 0.0.0.0 for server to listen on all interfaces, 127.0.0.1 for client
            // Convert 'localhost' to '127.0.0.1' to avoid IPv6 issues
            let host = process.env[`${key}_HOST`] || '127.0.0.1';
            if (host === 'localhost') {
                host = '127.0.0.1';
            }
            
            const envPort = process.env[`${serviceName}_PORT`];
            const port = envPort ? Number(envPort) : 3002;

            if (Number.isNaN(port) || port <= 0 || port >= 65536) {
                throw new Error(
                    `Invalid TCP port for ${serviceName}. Please set ${serviceName}_PORT to a valid number (1-65535).`,
                );
            }

            this[serviceName] = TcpConfiguration.setValue(port, host);
        });
    }

    static setValue(port: number, host: string): TcpClientOptions {
        return {
            transport: Transport.TCP,
            options: { host, port },
        };
    }
}

export function TcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
    return {
        name: serviceName,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
        },
    };
}
