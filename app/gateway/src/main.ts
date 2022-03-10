import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import compression from "fastify-compress";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.getHttpServer().keepAliveTimeout = 61 * 1000;
  app.getHttpServer().headersTimeout = 65 * 1000;

  // Cors
  app.enableCors();

  app.register(compression, { encodings: ["gzip", "deflate"] });

  await app.listen(process.env.APP_PORT || 3000, "0.0.0.0");
}
bootstrap();
