import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Res } from '@nestjs/common';
import { VisitorsService } from '../services/visitors.service';
import { LeadDto } from '../dtos/lead.dto';
import { Response } from 'express';
@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  // Cria ou retorna existente baseado em nome+email + interesses iniciais
  @Post('lead')
  saveLead(
    @Body() leadDto: LeadDto,
    @Query() query: Record<string, any>,
  ) {
    return this.visitorsService.saveLead(leadDto, query);
  }

  // Adiciona um único interesse ao Lead
  @Patch('lead/:id/interesses')
  async addInterest(
    @Param('id') id: string,
    @Body('interesse') interesse: { tipo: string; valor: any },
  ) {
    const updated = await this.visitorsService.addInteresse(+id, interesse);
    if (!updated) {
      throw new NotFoundException(`Lead ${id} não encontrado`);
    }
    return updated;
  }

  @Get('export/leads')
async exportLeads(@Res() res: Response) {
  const csvData = await this.visitorsService.exportLeadsToCSV();
  
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
  res.send(csvData);
}

  @Get()
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.visitorsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(+id);
  }
}
