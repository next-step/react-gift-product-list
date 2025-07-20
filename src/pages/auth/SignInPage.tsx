import kakaoLogo from "@/app/assets/kakao-logo.svg";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { useLogIn } from "@/features/auth/services/logIn";
import { AuthInput } from "@/features/auth/ui/AuthInput";

import { useRedirect } from "@/shared/hooks/useRedirect";
import { Button } from "@/shared/ui";

import { VerticalSpacing } from "@/widgets/layouts/Spacing.styled";

import * as Styles from "./SignInPage.styled";

export default function SignInPage() {
    const { returnToRedirect } = useRedirect();
    const { signIn } = useAuth();

    const {
        isLoginButtonActive,

        email,
        emailError,
        emailInputProps,

        password,
        passwordError,
        passwordInputProps,
    } = useSignIn();

    const { request } = useLogIn();

    const onSignIn = async () => {
        const response = await request({ email, password });
        signIn(email, response!.authToken);
        returnToRedirect("/");
    };

    return (
        <Styles.Container>
            <Styles.KakaoLogo src={kakaoLogo} alt="카카오" />

            <Styles.Form onSubmit={(e) => e.preventDefault()}>
                <Styles.FieldSet>
                    <AuthInput
                        type="email"
                        width="100%"
                        height="44px"
                        placeholder="이메일"
                        value={email}
                        error={emailError}
                        {...emailInputProps}
                    />
                </Styles.FieldSet>
                <VerticalSpacing size="16px" />
                <Styles.FieldSet>
                    <AuthInput
                        type="password"
                        width="100%"
                        height="44px"
                        placeholder="비밀번호"
                        value={password}
                        error={passwordError}
                        {...passwordInputProps}
                    />
                </Styles.FieldSet>

                <VerticalSpacing size="48px" />

                <Button
                    variant={isLoginButtonActive ? "primary" : "disabled"}
                    disabled={!isLoginButtonActive}
                    rounded={true}
                    width="100%"
                    height="44px"
                    onClick={onSignIn}
                >
                    로그인
                </Button>
            </Styles.Form>
        </Styles.Container>
    );
}
