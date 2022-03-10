import { Query, Resolver } from "@nestjs/graphql";
import { Blog } from "./types/blog.type";

@Resolver()
export class SearchResolver {
  @Query((returns) => [Blog])
  search(): Blog[] {
    const blog1 = new Blog();
    blog1.id = "1";

    const blog2 = new Blog();
    blog2.id = "2";

    const blog3 = new Blog();
    blog3.id = "3";

    return [blog1, blog2, blog3];
  }
}
