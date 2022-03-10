import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Tag {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;
}
