import {PropsWithChildren} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function AuthRequired(props: PropsWithChildren) {
    const {user} = useUser();
    return user ? <>{props.children}</> : <p>You need to be authenticated to access this content.</p>
}
