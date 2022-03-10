import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Tag {
  @Field((type) => ID)
  @Directive("@external")
  id: string;
}
