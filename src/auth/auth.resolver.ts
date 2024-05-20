import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/signInResponse';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { SignInContext } from './dto/SignInContext';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: SignInContext,
    @Context('res') res: Response,
  ) {
    const signInResponse = await this.authService.signIn(context.user);

    res.cookie('token', signInResponse.accessToken, {
      httpOnly: true,
      //環境変数などを使用して動的に本番環境の場合のみsecureをtrueにする
      secure: false,
      sameSite: 'strict',
      maxAge: 6 * 60 * 60 * 1000,
    });

    return signInResponse;
  }
}
