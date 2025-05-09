import { Module } from '@nestjs/common';
import { CategoryModule } from './infra/http/modules/category/Category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
