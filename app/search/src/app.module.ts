import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SearchModule } from "./search/search.module";
import { Blog } from "./search/types/blog.type";

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [Blog],
      },
      path: process.env.APOLLO_SERVER_PATH
        ? process.env.APOLLO_SERVER_PATH
        : "/graphql",
      fieldResolverEnhancers: ["guards"],
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
      introspection: true,
    }),
    SearchModule,
  ],

  providers: [],
})
export class AppModule {}
