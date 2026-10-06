import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitorsService } from '../services/exhibitors.service';
import { ExhibitorsController } from '../controllers/exhibitors.controller';
import { Exhibitor } from '../entities/exhibitor.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Exhibitor])], 
  controllers: [ExhibitorsController],
  providers: [ExhibitorsService],
})
export class ExhibitorsModule {}
