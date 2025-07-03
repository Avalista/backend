import { Screen } from 'src/modules/screen/entities/Screen';

export abstract class ScreenRepository {
  abstract create(screen: Screen): Promise<void>;
  abstract findById(id: string): Promise<Screen | null>;
  abstract findByProjectId(id: string): Promise<Screen[] | null>;
}
