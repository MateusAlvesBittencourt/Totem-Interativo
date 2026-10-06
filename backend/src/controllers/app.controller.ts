import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { Exhibitor } from '../entities/exhibitor.entity';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { Product } from '../entities/product.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Exhibitor)
    private readonly exhibitorRepository: Repository<Exhibitor>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Post('/csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('Arquivo não foi enviado');
    }

    interface CsvRow {
      Categoria: string;
      Subcategoria: string;
      Produto: string;
      Nome: string;
      Predio?: string;
    }
    const firstRow = await new Promise<CsvRow>((resolve, reject) => {
      let first: CsvRow | null = null;
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (row: CsvRow) => {
          if (!first) {
            first = row;
            resolve(row);
          }
        })
        .on('end', () => {
          if (!first) reject(new Error('Arquivo CSV está vazio'));
        })
        .on('error', reject);
    });

    const categoria = firstRow.Categoria?.trim();
    const subcategoria = firstRow.Subcategoria?.trim();
    const produto = firstRow.Produto?.trim();
    const nome = firstRow.Nome?.trim();

    if (!categoria || !subcategoria || !produto || !nome) {
      throw new BadRequestException(
        'O arquivo CSV não contém as colunas esperadas',
      );
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { categoryName: categoria },
    });
    const existingSubcategory = await this.subcategoryRepository.findOne({
      where: { name: subcategoria },
    });
    const existingProduct = await this.productRepository.findOne({
      where: { productName: produto },
    });
    const existingExhibitor = await this.exhibitorRepository.findOne({
      where: { exhibitorName: nome },
    });

    if (
      existingCategory ||
      existingSubcategory ||
      existingProduct ||
      existingExhibitor
    ) {
      throw new BadRequestException(
        'O arquivo CSV já foi inserido no banco de dados – dados duplicados',
      );
    }

    const categoriesMap = new Map<string, Partial<Category>>();
    const subcategoriesMap = new Map<string, Partial<Subcategory>>();
    const productsMap = new Map<string, Partial<Product>>();
    const exhibitorsMap = new Map<string, Partial<Exhibitor>>();

    const categorySubcategorySet = new Set<string>();
    const exhibitorCategorySet = new Set<string>();
    const exhibitorSubcategorySet = new Set<string>();
    const productSubcategorySet = new Set<string>();
    const productExhibitorSet = new Set<string>();
    const productCategorySet = new Set<string>();
    const subToCategoryMap = new Map<string, string>();

    return new Promise<string>((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (row: CsvRow) => {
          const cat = row.Categoria?.trim();
          const sub = row.Subcategoria?.trim();
          const prod = row.Produto?.trim();
          const expo = row.Nome?.trim();
          const predio = row.Predio?.trim();

          if (cat) categoriesMap.set(cat, { categoryName: cat });

          if (sub) {
            subcategoriesMap.set(sub, { name: sub });
            subToCategoryMap.set(sub, cat);
          }

          if (prod) productsMap.set(prod, { productName: prod });

          if (expo && predio) {
            exhibitorsMap.set(`${expo}|${predio}`, {
              exhibitorName: expo,
              buildingName: predio,
            });
          }

          if (cat && sub) categorySubcategorySet.add(`${sub}->${cat}`);
          if (expo && predio && cat)
            exhibitorCategorySet.add(`${expo}|${predio}->${cat}`);
          if (expo && predio && sub)
            exhibitorSubcategorySet.add(`${expo}|${predio}->${sub}`);
          if (prod && sub) productSubcategorySet.add(`${prod}->${sub}`);
          if (prod && expo && predio)
            productExhibitorSet.add(`${prod}->${expo}|${predio}`);
          if (prod && cat) productCategorySet.add(`${prod}->${cat}`);
        })
        .on('end', async () => {
          try {
            const categories = await this.filterAndSaveUnique(
              this.categoryRepository,
              [...categoriesMap.values()],
              'categoryName',
            );
            for (const [subName, subData] of subcategoriesMap.entries()) {
              const catName = subToCategoryMap.get(subName);
              if (catName) {
                const category = categories.find(
                  (c) => c.categoryName === catName,
                );
                if (category) (subData as any).category = category;
              }
            }
            const subcategories = await this.filterAndSaveUnique(
              this.subcategoryRepository,
              [...subcategoriesMap.values()],
              'name',
            );
            const exhibitors: Exhibitor[] = [];
            for (const exhibitorData of exhibitorsMap.values()) {
              const existing = await this.exhibitorRepository.findOne({
                where: {
                  exhibitorName: exhibitorData.exhibitorName,
                  buildingName: exhibitorData.buildingName,
                },
              });

              if (existing) {
                exhibitors.push(existing);
              } else {
                const saved =
                  await this.exhibitorRepository.save(exhibitorData);
                exhibitors.push(saved);
              }
            }
            const products = await this.filterAndSaveUnique(
              this.productRepository,
              [...productsMap.values()],
              'productName',
            );

            const getCategory = (name: string) =>
              categories.find((c) => c.categoryName === name);
            const getSubcategory = (name: string) =>
              subcategories.find((s) => (s as any).name === name);

            const getExhibitor = (name: string, predio: string) =>
              exhibitors.find(
                (e) => e.exhibitorName === name && e.buildingName === predio,
              );

            const getProduct = (name: string) =>
              products.find((p) => (p as any).productName === name);
            for (const entry of categorySubcategorySet) {
              const [sub, cat] = entry.split('->');
              const subcat = getSubcategory(sub);
              const category = getCategory(cat);
              if (subcat && category) {
                await this.safelyAddRelation(
                  this.subcategoryRepository,
                  subcat,
                  'categories',
                  category,
                );
              }
            }

            for (const entry of exhibitorCategorySet) {
              const [expoKey, cat] = entry.split('->');
              const [expoName, predio] = expoKey.split('|');
              const exhibitor = getExhibitor(expoName, predio);
              const category = getCategory(cat);
              if (exhibitor && category) {
                await this.safelyAddRelation(
                  this.exhibitorRepository,
                  exhibitor,
                  'categories',
                  category,
                );
              }
            }

            for (const entry of exhibitorSubcategorySet) {
              const [expoKey, sub] = entry.split('->');
              const [expoName, predio] = expoKey.split('|');
              const exhibitor = getExhibitor(expoName, predio);
              const subcat = getSubcategory(sub);
              if (exhibitor && subcat) {
                await this.safelyAddRelation(
                  this.exhibitorRepository,
                  exhibitor,
                  'subcategories',
                  subcat,
                );
              }
            }

            for (const entry of productSubcategorySet) {
              const [prodName, subName] = entry.split('->');
              const product = getProduct(prodName);
              const subcat = getSubcategory(subName);
              if (product && subcat) {
                (product as any).subcategory = subcat;
                await this.productRepository.save(product as any);
              }
            }

            for (const entry of productExhibitorSet) {
              const [prodName, expoKey] = entry.split('->');
              const [expoName, predio] = expoKey.split('|');
              const product = getProduct(prodName);
              const exhibitor = getExhibitor(expoName, predio);
              if (product && exhibitor) {
                (product as any).exhibitor = exhibitor;
                await this.productRepository.save(product as any);
              }
            }

            for (const entry of productCategorySet) {
              const [prodName, catName] = entry.split('->');
              const product = getProduct(prodName);
              const category = getCategory(catName);
              if (product && category) {
                (product as any).category = category;
                await this.productRepository.save(product as any);
              }
            }

            fs.unlinkSync(file.path);
            resolve('CSV importado com sucesso!');
          } catch (err) {
            reject(`Erro ao processar o arquivo: ${(err as any).message}`);
          }
        })
        .on('error', (error) => {
          reject(`Erro ao ler o arquivo: ${error.message}`);
        });
    });
  }

  private async filterAndSaveUnique<T>(
    repository: Repository<T>,
    entities: Partial<T>[],
    field: keyof T,
  ): Promise<T[]> {
    const savedEntities: T[] = [];

    for (const entity of entities) {
      const value = entity[field];
      const existing = await repository.findOne({
        where: { [field]: value } as any,
      });
      if (!existing) {
        const saved = await repository.save(entity as any);
        savedEntities.push(saved);
      } else {
        savedEntities.push(existing);
      }
    }

    return savedEntities;
  }

  private async safelyAddRelation<T>(
    repository: Repository<T>,
    entity: T,
    relation: string,
    relatedEntity: any,
  ) {
    try {
      const alias = 'e';
      const primaryColumn = repository.metadata.primaryColumns[0].propertyName;

      const existing = await repository
        .createQueryBuilder(alias)
        .leftJoinAndSelect(`${alias}.${relation}`, 'rel')
        .where(`${alias}.${primaryColumn} = :id`, {
          id: (entity as any)[primaryColumn],
        })
        .getOne();

      const alreadyRelated = (existing as any)?.[relation]?.some(
        (rel: any) =>
          rel.id === relatedEntity.id ||
          rel[primaryColumn] === relatedEntity[primaryColumn],
      );

      if (!alreadyRelated) {
        await repository
          .createQueryBuilder()
          .relation(relation)
          .of(entity)
          .add(relatedEntity);
      }
    } catch (err) {
      console.error(
        `Erro ao adicionar relação "${relation}": ${(err as any).message}`,
      );
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
