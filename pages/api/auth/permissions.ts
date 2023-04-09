import {NextApiRequest, NextApiResponse} from "next";
import {getSession, withApiAuthRequired,} from "@auth0/nextjs-auth0";
import {getAuth0Permissions} from "../../../server/auth0";

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    res.json({
        permissions: await getAuth0Permissions(session!!.user),
    })
});
