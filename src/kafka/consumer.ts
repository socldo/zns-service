import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import { MessagePayloadSendAllEmployee } from './message.payload.send.all/message-payload-employee';
import { ConsumerService } from './consumer.service';
import { KafkaService } from './kafka.service';
import { MessagePayloadZNS } from './message.payload/message.zns.model';
import { ZnsService } from 'src/zns/zns.service';

@Injectable()
export class ZnsConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService,
    private readonly znsService: ZnsService,
  ) { }

  async onModuleInit() {

    await this.consumerService.consumer(
      { topic: 'kafka.topic.zns-message-notification' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const messageDataString = message.value.toString();
          // console.log(messageDataString);
          
          if (messageDataString) {
            const messageData: MessagePayloadZNS = JSON.parse(messageDataString);
  
            this.znsService.sendZnsToCustomer(messageData, messageData.access_token);
          }
        },
      },
    );

  }
}
