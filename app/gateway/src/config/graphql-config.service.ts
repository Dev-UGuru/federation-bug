import { Injectable } from "@nestjs/common";
import { GatewayModuleOptions, GatewayOptionsFactory } from "@nestjs/graphql";
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

@Injectable()
export class GraphqlConfigService implements GatewayOptionsFactory {
  createGatewayOptions(): GatewayModuleOptions {
    return {
      gateway: {
        ...(process.env.APOLLO_GATEWAY_SERVER_LIST && {
          serviceList: JSON.parse(
            process.env.APOLLO_GATEWAY_SERVER_LIST
          ) as any,
        }),
      },
      server: {
        path: "/",
        cors: true,
        introspection: true,
        plugins: [
          ApolloServerPluginInlineTrace,
          ...((process.env.APOLLO_SERVER_PLAYGROUND && [
            ApolloServerPluginLandingPageGraphQLPlayground,
          ]) || [ApolloServerPluginLandingPageDisabled]),
        ],
      },
    };
  }
}
