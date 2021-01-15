import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginAuthInput {

    @Field()
    username: string;

    @Field()
    password: string;
}