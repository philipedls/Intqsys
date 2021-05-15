import { Module } from '@nestjs/common';
import { CraftService } from './craft.service';
import { CraftController } from './craft.controller';

@Module({
  providers: [CraftService],
  controllers: [CraftController]
})
export class CraftModule {}
