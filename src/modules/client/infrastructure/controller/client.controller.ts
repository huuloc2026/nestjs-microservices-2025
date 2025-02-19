import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Inject,
} from '@nestjs/common';

import { CLIENT_SERVICE } from 'src/modules/client/client-di';
import { IClientService } from 'src/modules/client/core/port/client.service.interface';

@Controller('clients')
export class ClientController {
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientService: IClientService,
  ) {}

  @Post()
  async create(@Body() dto: any) {
    return this.clientService.create(dto.name);
  }

  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
