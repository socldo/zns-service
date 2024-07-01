import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

  private readonly kafka = new Kafka({
    brokers: [`172.16.10.95:9092`],
    connectionTimeout: 30000,
    requestTimeout: 25000,
    retry: {
      initialRetryTime: 100,
      retries: 8,
    },
  });
  private readonly consumers: Consumer[] = [];


  /**
   *
   * @param topic
   * @param config
   */
  async consumer(
    topic: ConsumerSubscribeTopic,
    config: ConsumerRunConfig,
  ) {
    const consumer = this.kafka.consumer({ groupId: 'hero23' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    await this.consumers.push(consumer);
  }


  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
