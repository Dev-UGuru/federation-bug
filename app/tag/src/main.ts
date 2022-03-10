import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { useContainer } from "class-validator";
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

  // Validation
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.APP_PORT || 3004, "0.0.0.0");
}
bootstrap();
