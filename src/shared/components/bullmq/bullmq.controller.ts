import { Controller } from '@nestjs/common';
import { BullmqService } from './bullmq.service';

@Controller('bullmq')
export class BullmqController {
  constructor(private readonly bullmqService: BullmqService) {}
}
