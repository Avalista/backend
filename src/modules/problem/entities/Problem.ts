import { randomUUID } from 'crypto';
import { Effort } from 'src/enums/Effort';
import { Severity } from 'src/enums/Severity';
import { Replace } from 'src/utils/replace';

interface ProblemProps {
  description: string;
  screenshots: string[];
  improvementSuggestions: string;
  severity: Severity;
  effort: Effort;
  resolvedAt?: Date;
  priority: boolean;
  finalEvaluationId?: string | null;
  originalProblemId?: string | null;
  evaluationItemId: string;
}

export class Problem {
  private _id: string;
  private props: ProblemProps;

  constructor(
    props: Replace<
      ProblemProps,
      {
        resolvedAt?: Date;
        finalEvaluationId?: string | null;
        originalProblemId?: string | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      resolvedAt: props.resolvedAt ?? undefined,
      finalEvaluationId: props.finalEvaluationId ?? null,
      originalProblemId: props.originalProblemId ?? null,
    };
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get screenshots(): string[] {
    return this.props.screenshots;
  }

  set screenshots(screenshots: string[]) {
    this.props.screenshots = screenshots;
  }

  get improvementSuggestions(): string {
    return this.props.improvementSuggestions;
  }

  set improvementSuggestions(improvementSuggestions: string) {
    this.props.improvementSuggestions = improvementSuggestions;
  }

  get severity(): Severity {
    return this.props.severity;
  }

  set severity(severity: Severity) {
    this.props.severity = severity;
  }

  get effort(): Effort {
    return this.props.effort;
  }

  set effort(effort: Effort) {
    this.props.effort = effort;
  }

  get resolvedAt(): Date | undefined {
    return this.props.resolvedAt;
  }

  set resolvedAt(resolvedAt: Date | undefined) {
    this.props.resolvedAt = resolvedAt;
  }

  get priority(): boolean {
    return this.props.priority;
  }

  set priority(priority: boolean) {
    this.props.priority = priority;
  }

  get finalEvaluationId(): string | null | undefined {
    return this.props.finalEvaluationId;
  }

  get originalProblemId(): string | null | undefined {
    return this.props.originalProblemId;
  }

  get evaluationItemId(): string {
    return this.props.evaluationItemId;
  }

  updateDetails(
    description: string,
    screenshots: string[],
    improvementSuggestions: string,
    severity: Severity,
    effort: Effort,
    priority: boolean,
    finalEvaluationId?: string | null,
    originalProblemId?: string | null,
    evaluationItemId?: string | null,
  ): void {
    this.description = description;
    this.screenshots = screenshots;
    this.improvementSuggestions = improvementSuggestions;
    this.severity = severity;
    this.effort = effort;
    this.priority = priority;
    if (finalEvaluationId) this.props.finalEvaluationId = finalEvaluationId;
    if (originalProblemId) this.props.originalProblemId = originalProblemId;
    if (evaluationItemId) this.props.evaluationItemId = evaluationItemId;
  }
}
