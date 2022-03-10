import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from "@nestjs/graphql";
import { GraphqlConfigService } from "./config/graphql-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLGatewayModule.forRootAsync({
      useClass: GraphqlConfigService,
      imports: [],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
  controllers: [],
})
export class AppModule {}
