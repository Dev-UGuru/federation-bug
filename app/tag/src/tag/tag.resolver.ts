import { Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { Tag } from "./types/tag.type";

@Resolver((of) => Tag)
export class TagResolver {
  @Query((returns) => Tag)
  getTag(): Tag {
    const tag = new Tag();
    tag.name = "getTag";

    return tag;
  }
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    const tag = new Tag();
    tag.name = "tag";
    tag.id = reference.id;

    return tag;
  }
}
