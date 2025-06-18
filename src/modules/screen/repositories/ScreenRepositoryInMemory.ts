import { Screen } from 'src/modules/screen/entities/Screen';
import { ScreenRepository } from 'src/modules/screen/repositories/ScreenRepository';

export class ScreenRepositoryInMemory implements ScreenRepository {
  public screens: Screen[] = [];

  async create(screen: Screen): Promise<void> {
    this.screens.push(screen);
    return Promise.resolve();
  }

  async findById(id: string): Promise<Screen | null> {
    return Promise.resolve(
      this.screens.find((screen) => screen.id === id) || null,
    );
  }
}
