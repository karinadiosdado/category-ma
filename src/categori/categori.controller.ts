import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriService } from './categori.service.js';
import { CreateCategoriDto } from './dto/create-categori.dto.js';
import { UpdateCategoriDto } from './dto/update-categori.dto.js';
import { PaginationDto } from '../common/dto/PaginationDto.js';

@Controller()
export class CategoriController {
  constructor(private readonly categoriService: CategoriService) {}

  @MessagePattern({ cmd: 'create_category' })
  create(@Payload() createCategoriDto: CreateCategoriDto) {
    return this.categoriService.create(createCategoriDto);
  }

  @MessagePattern({ cmd: 'find_all_categories' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.categoriService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_category' })
  findOne(@Payload('id') id: number) {
    return this.categoriService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_category' })
  update(@Payload() updateCategoriDto: UpdateCategoriDto) {
    return this.categoriService.update(updateCategoriDto.id, updateCategoriDto);
  }

  @MessagePattern({ cmd: 'remove_category' })
  remove(@Payload('id') id: number) {
    return this.categoriService.remove(+id);
  }
}