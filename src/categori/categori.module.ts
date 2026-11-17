import { Module } from '@nestjs/common';
import { CategoriService } from './categori.service.js';
import { CategoriController } from './categori.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriController],
  providers: [CategoriService],
})
export class CategoriModule {}
