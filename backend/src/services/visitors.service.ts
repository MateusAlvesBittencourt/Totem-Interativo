import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadDto } from '../dtos/lead.dto';
import { parseInteresses } from '../common/mapper/parseInteresses';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { Category } from '../entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { Totem } from '../entities/totem.entity';
import { Exhibitor } from '../entities/exhibitor.entity';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  /** Cria ou retorna existente (nome+email iguais) e registra interesses iniciais */
  async saveLead(
    leadDto: LeadDto,
    query: Record<string, any>,
  ): Promise<Lead> {
    const nomeBusca  = leadDto.nome.trim().toLowerCase();
    const emailBusca = leadDto.email.trim().toLowerCase();

    // busca case-insensitive por nome+email
    const existing = await this.entityManager
      .createQueryBuilder(Lead, 'lead')
      .where('LOWER(lead.name)  = :name',  { name: nomeBusca  })
      .andWhere('LOWER(lead.email) = :email', { email: emailBusca })
      .getOne();

    if (existing) {
      return existing;
    }

    const interesses = parseInteresses(query);
    await this.entityManager.query('PRAGMA foreign_keys = OFF');

    const lead = new Lead();
    lead.name         = leadDto.nome.trim();
    lead.email        = emailBusca;
    lead.profession   = leadDto.profissao;
    lead.company      = leadDto.empresa;
    lead.businessArea = leadDto.ramo;
    lead.phone        = leadDto.telefone;
    lead.interesses   = interesses;

    lead.category    = { categoryId: leadDto.id_categoria } as Category;
    lead.subcategory = { subcategoryId: leadDto.id_subcategoria } as Subcategory;
    lead.totem       = { totemId: leadDto.id_totem } as Totem;
    lead.exhibitor   = { exhibitorId: leadDto.id_expositor } as Exhibitor;

    return this.entityManager.save(Lead, lead);
  }

  /** Adiciona um interesse ao JSON de interesses do Lead */
  async addInteresse(
    leadId: number,
    interesse: { tipo: string; valor: any },
  ): Promise<Lead> {
    const lead = await this.entityManager.findOne(Lead, {
      where: { leadId },
    });
    if (!lead) {
      return null;
    }

    const atual = lead.interesses || {};
    if (!Array.isArray(atual[interesse.tipo])) {
      atual[interesse.tipo] = [];
    }
    if (!atual[interesse.tipo].includes(interesse.valor)) {
      atual[interesse.tipo].push(interesse.valor);
    }

    lead.interesses = atual;
    return this.entityManager.save(Lead, lead);
  }

  // Métodos originais que podem permanecer inalterados:
  findAll() {
    return this.entityManager.find(Lead);
  }

  findOne(id: number) {
    return this.entityManager.findOneBy(Lead, { leadId: id });
  }

  /** Exporta todos os leads para formato CSV */
async exportLeadsToCSV(): Promise<string> {
  // Busca todos os leads com relacionamentos
  const leads = await this.entityManager
    .createQueryBuilder(Lead, 'lead')
    .leftJoinAndSelect('lead.category', 'category')
    .leftJoinAndSelect('lead.subcategory', 'subcategory')
    .leftJoinAndSelect('lead.totem', 'totem')
    .leftJoinAndSelect('lead.exhibitor', 'exhibitor')
    .getMany();

  // Cabeçalho do CSV
  const headers = [
    'Nome',
    'Email',
    'Telefone',
    'Profissão',
    'Empresa',
    'Área de Negócio',
    'Interesses'
  ];

  // Função para escapar valores CSV
  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) {
      return '';
    }
    
    const stringValue = String(value);
    // Se contém vírgula, quebra de linha ou aspas, colocar entre aspas
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Função para formatar interesses
  const formatInteresses = (interesses: any): string => {
    if (!interesses || typeof interesses !== 'object') {
      return '';
    }
    
    try {
      const interessesArray = [];
      for (const [tipo, valores] of Object.entries(interesses)) {
        if (Array.isArray(valores) && valores.length > 0) {
          interessesArray.push(`${tipo}: ${valores.join(', ')}`);
        }
      }
      return interessesArray.join(' | ');
    } catch {
      return JSON.stringify(interesses);
    }
  };

  // Converte os dados para linhas CSV
  const csvRows = [
    headers.join(','), // Linha de cabeçalho
    ...leads.map(lead => [
      escapeCSV(lead.name),
      escapeCSV(lead.email),
      escapeCSV(lead.phone),
      escapeCSV(lead.profession),
      escapeCSV(lead.company),
      escapeCSV(lead.businessArea),
      escapeCSV(formatInteresses(lead.interesses))
    ].join(','))
  ];

  // Adiciona BOM para UTF-8 (para Excel reconhecer acentos corretamente)
  return '\uFEFF' + csvRows.join('\n');
}

  update(id: number, dto: any) {
    return `This action updates a #${id} visitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitor`;
  }
}
