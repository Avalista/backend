import { randomUUID } from 'crypto';

interface ProjectProps {
  name: string;
  description: string;
}

export class Project {
  private props: ProjectProps;
  private _id: string;

  constructor(props: ProjectProps, id?: string) {
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

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }
}
