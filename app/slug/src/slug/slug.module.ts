import { Module } from "@nestjs/common";
import { BlogResolver } from "./blog.resolver";

@Module({
  imports: [],
  providers: [BlogResolver],
})
export class SlugModule {}
