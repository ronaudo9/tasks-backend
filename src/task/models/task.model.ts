import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  @Field()
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  @Field({ nullable: true })
  description: string;
}
