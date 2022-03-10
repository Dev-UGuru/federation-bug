import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Blog {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  title: string;
}
