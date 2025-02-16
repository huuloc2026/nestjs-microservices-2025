import { PartialType } from '@nestjs/swagger';
import { CreateTokenRepoDto } from './create-token-repo.dto';

export class UpdateTokenRepoDto extends PartialType(CreateTokenRepoDto) {}
