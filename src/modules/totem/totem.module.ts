import { Module } from '@nestjs/common';
import { TotemController } from './totem.controller';
import { TotemService } from './totem.service';

@Module({
  controllers: [TotemController],
  exports: [TotemService],
  providers: [TotemService]
})
export class TotemModule {}
