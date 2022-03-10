import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { TagModule } from "./tag/tag.module";

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [],
      },
      path: process.env.APOLLO_SERVER_PATH
        ? process.env.APOLLO_SERVER_PATH
        : "/graphql",
      fieldResolverEnhancers: ["guards"],
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
      introspection: true,
    }),
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
