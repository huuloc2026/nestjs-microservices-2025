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
import { ClientService } from '../../application/client.service';
import { CLIENT_SERVICE } from 'src/modules/client/client-di';

@Controller('clients')
export class ClientController {
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientService: ClientService,
  ) {}

  @Post()
  async create(@Body() dto: any) {
    return this.clientService.createClient(dto.name, dto.email, dto.password);
  }

  @Get()
  async findAll() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.clientService.updateClient(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
