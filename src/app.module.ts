import { CacheModule } from "@nestjs/cache-manager";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PublicModule } from "./public/public.module";
import { AuthenticationMiddleware } from "./utils.common/utils.middleware.common/utils.bearer-token.common";
import { HttpModule } from "@nestjs/axios";
import { WebhookModule } from "./webhook/webhook.module";
import { ZnsModule } from './zns/zns.module';
import { ZnsConsumer } from "./kafka/consumer";
import { ConsumerService } from "./kafka/consumer.service";
console.log("process.env.CONFIG_REDIS_HOST_DELIVERY_THIRDPARTY", process.env);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    CacheModule.register({ ttl: 5, max: 1000 }),
    HttpModule,
    MongooseModule,
    PublicModule,
    ZnsModule,
  ],
  controllers: [],
  providers: [ZnsConsumer, ConsumerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
