import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ScreenRepository } from 'src/modules/screen/repositories/ScreenRepository';
import { Screen } from 'src/modules/screen/entities/Screen';
import { PrismaScreenMapper } from '../mappers/PrismaScreenMapper';

@Injectable()
export class PrismaScreenRepository implements ScreenRepository {
  constructor(private prisma: PrismaService) {}

  async create(screen: Screen): Promise<void> {
    const data = PrismaScreenMapper.toPrisma(screen);
    await this.prisma.screen.create({ data });
  }

  async findById(id: string): Promise<Screen | null> {
    const screen = await this.prisma.screen.findUnique({ where: { id } });
    return screen ? PrismaScreenMapper.toDomain(screen) : null;
  }
}
