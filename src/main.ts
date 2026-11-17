// @prefix create-ms
// @description 
/* eslint-disable */

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module.js";
import { envs } from "./envs.js";
import { Logger, ValidationPipe } from "@nestjs/common";

  const logger = new Logger('Category Microservice');

const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,  
     {
      transport: Transport.TCP,
      options:{port:envs.port}
    },);
    app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe ({
      whitelist: true,
      forbidNonWhitelisted: true,
      
    }),
  );



  await app.listen();
logger.log(`Products microservice running on port \${envs.port}`);