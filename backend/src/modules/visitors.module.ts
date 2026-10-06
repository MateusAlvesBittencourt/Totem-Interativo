import { Module } from '@nestjs/common';
import { VisitorsService } from '../services/visitors.service';
import { VisitorsController } from '../controllers/visitors.controller';

@Module({
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
