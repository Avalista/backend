export interface FindProjectsByEvaluator {
  evaluatorId: string; //Temporario enquanto auth n é implementado
  search?: string;
  orderBy?: 'name-asc' | 'name-desc';
}
