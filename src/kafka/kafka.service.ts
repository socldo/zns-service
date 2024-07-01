import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown{
  private readonly kafka = new Kafka({
    brokers: [ `172.16.10.95:9092`],
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  
  async produce(record: ProducerRecord){
    await this.producer.send(record);
   
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}
