import { Heuristic } from '../entities/Heuristic';

export abstract class HeuristicRepository {
  abstract getAll(): Promise<Heuristic[] | null>;
}
