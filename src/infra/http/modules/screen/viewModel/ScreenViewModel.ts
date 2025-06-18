import { Screen } from 'src/modules/screen/entities/Screen';

export class ScreenViewModel {
  static toHttp({ id, title, description, screenshot, projectId }: Screen) {
    return {
      id,
      title,
      description,
      screenshot,
      projectId,
    };
  }
}
