import { Module } from '@nestjs/common';
import { PanelController } from './panel.controller';
import { PanelService } from './panel.service';

@Module({
    // imports: [TypeOrmModule.forFeature([Users])],
    controllers: [PanelController],
    exports: [PanelService],
    providers: [PanelService]
})
export class CompanyModule { }
