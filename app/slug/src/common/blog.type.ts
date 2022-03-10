import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Tag } from "./tag.type";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Blog {
  @Field((type) => ID)
  @Directive("@external")
  id: string;

  @Field((type) => String, { nullable: true })
  @Directive("@external")
  title?: string;

  @Field((type) => Tag, { nullable: true })
  @Directive("@external")
  tag?: Tag;
}
