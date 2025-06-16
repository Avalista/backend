import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export type SuggestionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface CategoryProps {
  name: string;
  color: string;
  status: SuggestionStatus;
  authorId: string;
}

export class Category {
  private props: CategoryProps;
  private _id: string;

  constructor(
    props: Replace<
      CategoryProps,
      { status?: SuggestionStatus; authorId?: string }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
      authorId: props.authorId ?? '',
    };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get color(): string {
    return this.props.color;
  }

  set color(color: string) {
    this.props.color = color;
  }

  get status(): SuggestionStatus {
    return this.props.status;
  }

  set status(status: SuggestionStatus) {
    this.props.status = status;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }
}
