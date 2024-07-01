import { Module } from '@nestjs/common';
import { ZnsController } from './zns.controller';
import { ZnsService } from './zns.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [HttpModule, ClientsModule.register([
    {
      name: 'hero23',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'hero23',
          brokers: ['172.16.10.95:9092'],
        },
        consumer: {
          groupId: 'hero23',
        },
      },
    },
  ]),
  ],
  controllers: [ZnsController],
  providers: [ZnsService],
  exports: [ZnsService]
})
export class ZnsModule { }
