import { randomUUID } from 'crypto';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';
import { Replace } from 'src/utils/replace';

interface ProjectProps {
  name: string;
  description: string;
  memberships: ProjectMembership[];
  screens?: {
    id: string;
    title: string;
    description: string;
    screenshot: string;
  }[];
  sessions?: {
    id: string;
    startedAt: Date;
    finishedAt: Date | null;
    status: string;
  }[];
  finalEvaluation?: { id: string; createdAt: Date } | null;
}

export class Project {
  private props: ProjectProps;
  private _id: string;

  constructor(
    props: Replace<ProjectProps, { memberships?: ProjectMembership[] }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      memberships: props.memberships ?? [],
      screens: props.screens ?? [],
      sessions: props.sessions ?? [],
      finalEvaluation: props.finalEvaluation ?? null,
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

  get screens(): {
    id: string;
    title: string;
    description: string;
    screenshot: string;
  }[] {
    return this.props.screens ?? [];
  }

  set screens(
    screens: {
      id: string;
      title: string;
      description: string;
      screenshot: string;
    }[],
  ) {
    this.props.screens = screens;
  }

  get sessions(): {
    id: string;
    startedAt: Date;
    finishedAt: Date | null;
    status: string;
  }[] {
    return this.props.sessions ?? [];
  }

  set sessions(
    sessions: {
      id: string;
      startedAt: Date;
      finishedAt: Date | null;
      status: string;
    }[],
  ) {
    this.props.sessions = sessions;
  }

  get finalEvaluation(): { id: string; createdAt: Date } | null {
    return this.props.finalEvaluation ?? null;
  }

  set finalEvaluation(finalEvaluation: { id: string; createdAt: Date } | null) {
    this.props.finalEvaluation = finalEvaluation;
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
