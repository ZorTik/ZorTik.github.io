import {PropsWithChildren} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

export type AuthRequiredProps = PropsWithChildren & {
    showErrorMessage?: boolean
}

export default function AuthRequired({children, showErrorMessage}: AuthRequiredProps) {
    const {user, isLoading} = useUser();
    return isLoading
        ? null
        : user
            ? <>{children}</>
            : showErrorMessage ? <p>You need to be authenticated to access this content.</p> : null
}

export function AwaitAuthentication({children}: PropsWithChildren) {
    const {isLoading} = useUser();
    return !isLoading ? <>{children}</> : null;
}
