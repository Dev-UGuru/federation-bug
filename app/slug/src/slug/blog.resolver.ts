import {
  Directive,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Blog } from "src/common/blog.type";

@Resolver((of) => Blog)
export class BlogResolver {
  @Query((returns) => String)
  getSlug(): string {
    return "";
  }

  // So it works
  @Directive('@requires(fields: "title ")')
  @ResolveField((of) => String, { nullable: true })
  slug(@Parent() { title }: Blog) {
    return `${title}`;
  }

  // Here is the Problem !! When i add tag {name}
  @Directive('@requires(fields: "title tag {name} ")')
  @ResolveField((of) => String, { nullable: true })
  slugBug(@Parent() { title, tag }: Blog) {
    return `${tag}/${title}`;
  }
}
