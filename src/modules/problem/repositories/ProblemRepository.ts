import { Problem } from '../entities/Problem';

export abstract class ProblemRepository {
  abstract create(project: Problem): Promise<void>;
}
