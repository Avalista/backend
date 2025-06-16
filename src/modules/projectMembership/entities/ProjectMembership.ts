import { randomUUID } from 'crypto';

interface ProjectMembershipProps {
  evaluatorId: string;
  projectId: string;
  admin: boolean;
  joinedAt: Date;
}

export class ProjectMembership {
  private props: ProjectMembershipProps;
  private _id: string;

  constructor(props: ProjectMembershipProps, id?: string) {
    this.props = { ...props };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get evaluatorId(): string {
    return this.props.evaluatorId;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get admin(): boolean {
    return this.props.admin;
  }

  get joinedAt(): Date {
    return this.props.joinedAt;
  }
}
