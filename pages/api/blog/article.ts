import {NextApiRequest, NextApiResponse} from "next";
import prismaClient from "../../../server/prisma";
import {requirePrivilegedAccess} from "../../../server/auth0";
import {statusJson} from "../../../server/api";
import {Article} from "../../../types/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET" && req.query["id"]) {
        const id = req.query["id"] as string;
        const article = await prismaClient.article.findUnique({where: {id: Number(id)},});
        if (article) res.status(200).json(article);
        else res.status(404).end();
    } else if(req.method === "POST") {
        const body = req.body as Article;
        await requirePrivilegedAccess(req, res, "write:blogs", async () => {
            await prismaClient.article.create({data: {...body, id: undefined,}});
            statusJson(res, 200, "Created article");
        });
    } else if(req.method === "DELETE") {
        await requirePrivilegedAccess(req, res, "write:blogs", async () => {
            await prismaClient.article.delete({where: {id: Number(req.query["id"])}});
            statusJson(res, 200, "Deleted article");
        });
    } else if(req.method === "PUT") {
        const body = req.body as Article;
        if (!body.id) {
            statusJson(res, 400, "No id provided");
            return;
        }
        await requirePrivilegedAccess(req, res, "write:blogs", async () => {
            await prismaClient.article.update({where: {id: Number(body.id)}, data: body,});
            statusJson(res, 200, "Updated article");
        });
    } else {
        res.status(405).end();
    }
}
