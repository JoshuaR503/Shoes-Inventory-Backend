import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './authType';
import { LoginAuthInput } from './login.input';

@Resolver(() => UserType)
export class AuthResolver {

    constructor(
        private authService: AuthService,
    ) {}

    @Mutation(() => Boolean)
    async signUp(
        @Args('username') username: string,
        @Args('password') password: string
    ) {
        return await this.authService.signUp(username, password);
    }

    @Mutation(() => String)
    async signIn(
        @Args('username') username: string,
        @Args('password') password: string
    ) {
        return await this.authService.signIn(username, password);
    }
}
