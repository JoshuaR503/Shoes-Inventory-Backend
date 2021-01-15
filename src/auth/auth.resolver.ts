import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './user.type';
import { LoginInput } from './types/login.input';

@Resolver(() => UserType)
export class AuthResolver {

    constructor(
        private authService: AuthService,
    ) {}

    @Mutation(() => Boolean)
    async signUp(@Args('loginInput') loginInput: LoginInput) {
        return await this.authService.signUp(loginInput);
    }

    @Mutation(() => UserType)
    async signIn(@Args('loginInput') loginInput: LoginInput) {
        return await this.authService.signIn(loginInput);
    }
}
