import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isSystemAdmin: boolean;
  sessionId?: string;
}

export class Evaluator {
  private props: UserSchema;
  private _id: string;

  constructor(
    props: Replace<UserSchema, { isSystemAdmin?: boolean; avatar?: string }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      avatar: props.avatar ?? '',
      isSystemAdmin: props.isSystemAdmin ?? false,
    };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get sessionId(): string | undefined {
    return this.props.sessionId;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  get isSystemAdmin(): boolean {
    return this.props.isSystemAdmin;
  }

  set isSystemAdmin(isAdmin: boolean) {
    this.props.isSystemAdmin = isAdmin;
  }
}
