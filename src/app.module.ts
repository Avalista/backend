import { Module } from '@nestjs/common';
import { CategoryModule } from './infra/http/modules/category/Category.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
