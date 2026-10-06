/* eslint-disable prettier/prettier */
import { MulterModule } from '@nestjs/platform-express';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './modules/products.module';
import { ExhibitorsModule } from './modules/exhibitors.module';
import { VisitorsModule } from './modules/visitors.module';
import { SearchBarModule } from './modules/search-bar.module';

import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { Exhibitor } from './entities/exhibitor.entity';
import { Lead } from './entities/lead.entity';
import { Totem } from './entities/totem.entity';
import { Admin } from './entities/admin.entity';

import { CategoryService } from './services/categories.service';
import { CategoryController } from './controllers/categories.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    // Carrega variáveis do .env automaticamente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeORM configurado via factory para usar env vars
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: cfg.get<'sqlite'>('TYPEORM_CONNECTION'),
        database: cfg.get<string>('DATABASE_PATH'),
        entities: [Category, Subcategory, Exhibitor, Lead, Totem, Admin, Product],
        synchronize: cfg.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Modules de domínio
    ProductsModule,
    ExhibitorsModule,
    VisitorsModule,
    SearchBarModule,

    // Configuração do Multer para upload de arquivos (CSV)
    MulterModule.register({
      dest: 'backend/save', // Diretório onde os arquivos serão salvos
    }),

    // Registro de repositórios caso use forFeature:
    TypeOrmModule.forFeature([Category,  Subcategory, Exhibitor, Lead, Totem, Admin,Product]),
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
