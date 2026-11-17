import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriModule } from './categori/categori.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CategoriModule],
})
export class AppModule {}
