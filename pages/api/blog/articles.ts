import {NextApiRequest, NextApiResponse} from "next";
import prismaClient from "../../../server/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).end();

    res.status(200).json(await prismaClient.article.findMany());
}
