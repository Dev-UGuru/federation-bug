import {
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from "@nestjs/graphql";
import { Tag } from "./common/tag.type";
import { Blog } from "./types/blog.type";

@Resolver((of) => Blog)
export class BlogResolver {
  @Query((returns) => Blog)
  get(): Blog {
    return new Blog();
  }

  @ResolveField((of) => Tag, { nullable: true })
  tag(): Tag {
    return { id: "1" };
  }
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    const blog = new Blog();
    blog.content = "content";
    blog.id = reference.id;
    blog.title = "blog title";

    return blog;
  }
}
