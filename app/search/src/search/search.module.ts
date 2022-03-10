import { Module } from "@nestjs/common";
import { SearchResolver } from "./search.resolver";

@Module({
  imports: [],
  providers: [SearchResolver],
})
export class SearchModule {}
