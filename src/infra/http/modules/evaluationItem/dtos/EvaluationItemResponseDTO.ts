import { ScreenResponseDTO } from '../../screen/dtos/ScreenResponseDTO';

export class EvaluationItemResponseDTO {
  id: string;
  status: string;
  reviewedAt: Date;
  screen: ScreenResponseDTO;
}
