import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConsumerService } from './consumer.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZnsService } from 'src/zns/zns.service';

@Module({
  imports: [HttpModule, ClientsModule.register([
    {
      name: 'zns-message',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'zns-message',
          brokers: ['172.16.10.95:9092'],
        },
        consumer: {
          groupId: 'zns-message',
        },
      },
    },
  ]),
  ],
  providers: [KafkaService, ConsumerService, ZnsService],
  exports:[KafkaService, ConsumerService]
})
export class KafkaModule {}
