export interface LeadDto {
  nome: string;
  profissao: string;
  empresa: string;
  ramo: string;
  telefone: string;
  email: string;
  id_categoria: number;
  id_subcategoria: number;
  id_totem: number;
  id_expositor: number;
  interesses: Record<string, any>;
}
