import {SWRResponse} from "swr";
import Loader from "../content/Loader";
import {PropsWithChildren} from "react";
import {AwaitAuthentication} from "./AuthRequired";

export type SWRContentProps = PropsWithChildren & {
    swr: SWRResponse
}

export default function SWRContent({swr, children}: SWRContentProps) {
    return <AwaitAuthentication>{swr.error ? <p>Failed to load content.</p> : !swr.data ? <Loader /> : <>{children}</>}</AwaitAuthentication>
}
