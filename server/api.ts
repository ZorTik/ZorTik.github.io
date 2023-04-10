import {NextApiResponse} from "next";

function statusJson(res: NextApiResponse, status: number, message: string) {
    return res.status(status).json({status, message, at: Date.now()});
}

export {
    statusJson,
}
