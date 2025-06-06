import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match', async: false })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as Record<string, unknown>;
    const relatedPropertyName = args.constraints[0] as string;
    const relatedValue = obj[relatedPropertyName] as string;
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const relatedPropertyName = args.constraints[0] as string;
    return `Field '${args.property}' must match field '${relatedPropertyName}'`;
  }
}

function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

export class CreateEvaluatorBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Password confirmation does not match.' })
  passwordConfirm: string;

  avatar: string;
}
