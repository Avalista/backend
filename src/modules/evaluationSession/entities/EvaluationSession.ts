import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface EvaluationSessionSchema {
  startedAt: Date;
  finishedAt: Date | null;
  status: 'IN_PROGRESS' | 'COMPLETED';
  evaluatorId: string;
  projectId: string;
}

export class EvaluationSession {
  private _id: string;
  private props: EvaluationSessionSchema;

  constructor(
    props: Replace<
      EvaluationSessionSchema,
      { status?: 'IN_PROGRESS' | 'COMPLETED'; finishedAt?: Date | null }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'IN_PROGRESS',
      finishedAt: props.finishedAt ?? null,
    };
  }

  get id(): string {
    return this._id;
  }

  get startedAt(): Date {
    return this.props.startedAt;
  }

  set startedAt(startedAt: Date) {
    this.props.startedAt = startedAt;
  }

  get finishedAt(): Date | null {
    return this.props.finishedAt;
  }

  set finishedAt(finishedAt: Date | null) {
    this.props.finishedAt = finishedAt;
  }

  get status(): 'IN_PROGRESS' | 'COMPLETED' {
    return this.props.status;
  }

  set status(status: 'IN_PROGRESS' | 'COMPLETED') {
    this.props.status = status;
  }

  get evaluatorId(): string {
    return this.props.evaluatorId;
  }

  get projectId(): string {
    return this.props.projectId;
  }
}
