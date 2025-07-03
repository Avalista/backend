import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface HeuristicSchema {
  code: string;
  name: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  categoryId: string;
  authorId: string;
}

export class Heuristic {
  private _id: string;
  private props: HeuristicSchema;

  constructor(
    props: Replace<
      HeuristicSchema,
      { status?: 'PENDING' | 'APPROVED' | 'REJECTED' }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
    };
  }

  get id(): string {
    return this._id;
  }

  get code(): string {
    return this.props.code;
  }

  set code(code: string) {
    this.props.code = code;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get status(): 'PENDING' | 'APPROVED' | 'REJECTED' {
    return this.props.status;
  }

  set status(status: 'PENDING' | 'APPROVED' | 'REJECTED') {
    this.props.status = status;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get authorId(): string {
    return this.props.authorId;
  }
}
