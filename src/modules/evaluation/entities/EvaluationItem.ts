import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface EvaluationItemSchema {
  status: 'NOT_REVIEWED' | 'REVIEWED_OK' | 'REVIEWED_ISSUE';
  reviewedAt: Date | null;
  screenId: string;
  heuristicId: string;
  sessionId: string;
}

export class EvaluationItem {
  private _id: string;
  private props: EvaluationItemSchema;

  constructor(
    props: Replace<
      EvaluationItemSchema,
      {
        status?: 'NOT_REVIEWED' | 'REVIEWED_OK' | 'REVIEWED_ISSUE';
        reviewedAt?: Date | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'NOT_REVIEWED',
      reviewedAt: props.reviewedAt ?? null,
    };
  }

  get id(): string {
    return this._id;
  }

  get status(): 'NOT_REVIEWED' | 'REVIEWED_OK' | 'REVIEWED_ISSUE' {
    return this.props.status;
  }

  set status(status: 'NOT_REVIEWED' | 'REVIEWED_OK' | 'REVIEWED_ISSUE') {
    this.props.status = status;
  }

  get reviewedAt(): Date | null {
    return this.props.reviewedAt;
  }

  set reviewedAt(date: Date | null) {
    this.props.reviewedAt = date;
  }

  get screenId(): string {
    return this.props.screenId;
  }

  set screenId(screenId: string) {
    this.props.screenId = screenId;
  }

  get heuristicId(): string {
    return this.props.heuristicId;
  }

  set heuristicId(heuristicId: string) {
    this.props.heuristicId = heuristicId;
  }

  get sessionId(): string {
    return this.props.sessionId;
  }

  set sessionId(sessionId: string) {
    this.props.sessionId = sessionId;
  }
}
