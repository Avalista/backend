import { CategoryRepository } from '../../repositories/CategoryRepository';

interface getManyCategoryRequest {
  page?: string;
  perPage?: string;
}

export class GetManyCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ page, perPage }: getManyCategoryRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const categories = await this.categoryRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return categories;
  }
}
