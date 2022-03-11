In this dummy project, a graphql federation bug is to be explained.

There is a Graphql gateway that is there for the schema and handles the communication.

There are also the small services Blog, Slug, Tag and Search.

### The Blog service

```
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
```

### The Tag service

```
import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Tag {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;
}
```

### The Search service

The search-service has a blog-resolver and extended as external Blog-Type

```
@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Blog {
  @Field((type) => ID)
  @Directive("@external")
  id: string;
}
```

```
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
```

### The Slug service

Now comes the slug-service which has the blog-service title as external extended.

```
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
}
```

```
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
}
```

## Up to this point, everything works as it should!!

Now I extend in the blog-type as external tag-type. The Gateway, says the schema is ok!!

```

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
```

```
@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Tag {
@Field((type) => ID)
@Directive("@external")
id: string;

@Field((type) => String, { nullable: true })
@Directive("@external")
name?: string;
}
```

### Here is the Problem !! When i add tag {name}

```
@Directive('@requires(fields: "title tag {name} ")')
@ResolveField((of) => String, { nullable: true })
slugBug(@Parent() { title, tag }: Blog) {
return `${tag}/${title}`;
}
```

But when i call this:

```
{
search {
id
content
slug
slugBug
tag {
name
}
}
}
```

I geht this error messages:

```
"statusText": "Bad Request",
"body": {
"errors": [
{
"message": "Cannot query field \"name\" on type \"Tag\".",
"locations": [
{
"line": 1,
"column": 121
}
],
"extensions": {
"code": "GRAPHQL_VALIDATION_FAILED",
"exception": {
"stacktrace": [
"GraphQLError: Cannot query field \"name\" on type \"Tag\".",
```

This means that as soon as I try to call a service on code level in 2 level, it does not work.

But i don't know why ? Is it a federation-Bug ?
