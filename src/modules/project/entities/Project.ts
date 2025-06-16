import { randomUUID } from 'crypto';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';
import { Replace } from 'src/utils/replace';

interface ProjectProps {
  name: string;
  description: string;
  memberships: ProjectMembership[];
}

export class Project {
  private props: ProjectProps;
  private _id: string;

  constructor(
    props: Replace<ProjectProps, { memberships?: ProjectMembership[] }>,
    id?: string,
  ) {
    this.props = { ...props, memberships: props.memberships ?? [] };
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

  get memberships(): ProjectMembership[] {
    return this.props.memberships;
  }

  set memberships(memberships: ProjectMembership[]) {
    this.props.memberships = memberships;
  }

  addMembership(membership: ProjectMembership): void {
    this.props.memberships.push(membership);
  }

  removeMembershipByEvaluatorId(evaluatorId: string): void {
    this.props.memberships = this.props.memberships.filter(
      (m) => m.evaluatorId !== evaluatorId,
    );
  }
}
