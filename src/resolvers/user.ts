import {
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
} from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entity/User";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const user = em.create(User, { username: options.username });
    await em.persistAndFlush(user);
  }
}
