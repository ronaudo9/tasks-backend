import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@InputType()
export class SignInContext {
  @Field(() => User)
  user: User;
}
