import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Blog } from "./common/blog.type";
import { SlugModule } from "./slug/slug.module";

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

    SlugModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
