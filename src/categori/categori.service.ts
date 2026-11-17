import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateCategoriDto } from './dto/create-categori.dto.js';
import { UpdateCategoriDto } from './dto/update-categori.dto.js';
import { PaginationDto } from '../common/dto/PaginationDto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoriService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertNameFree(name: string, exceptId?: number) {
    const existing = await this.prisma.categori.findUnique({ where: { name } });
    if (existing && existing.id !== exceptId) {
      throw new RpcException({
        status: HttpStatus.CONFLICT, // 409
        message: `Category with name "${name}" already exists`,
      });
    }
  }

  async create(dto: CreateCategoriDto) {
    await this.assertNameFree(dto.name);
    return this.prisma.categori.create({ data: dto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto || {};
    const total = await this.prisma.categori.count();
    const lastPage = Math.ceil(total / limit);

    const data = await this.prisma.categori.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const categori = await this.prisma.categori.findUnique({ where: { id } });
    if (!categori) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST, // 400
        message: `Category with id #${id} not found`,
      });
    }
    return categori;
  }

  async update(id: number, dto: UpdateCategoriDto) {
    const { id: _, ...data } = dto;
    await this.findOne(id);
    if (data.name) await this.assertNameFree(data.name, id);
    return this.prisma.categori.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.categori.delete({ where: { id } });
  }
}