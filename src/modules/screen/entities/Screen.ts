import { randomUUID } from 'crypto';

interface ScreenProps {
  title: string;
  description: string;
  screenshot: string;
  projectId: string;
}

export class Screen {
  private props: ScreenProps;
  private _id: string;

  constructor(props: ScreenProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get screenshot(): string {
    return this.props.screenshot;
  }

  get projectId(): string {
    return this.props.projectId;
  }
}
