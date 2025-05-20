import { randomUUID } from 'crypto';

interface CategoryProps {
  name: string;
  color: string;
}

export class Category {
  private props: CategoryProps;
  private _id: string;

  constructor(props: CategoryProps, id?: string) {
    this.props = { ...props };
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
}
