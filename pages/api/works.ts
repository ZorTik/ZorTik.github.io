import {NextApiRequest, NextApiResponse} from "next";
import * as fs from "fs";
import xml from "xml2json";

function loadWorks() {
    const root = process.cwd() + "/public/works";
    return fs.readdirSync(root).map(file => {
            const obj = xml.toJson(fs.readFileSync(`${root}/${file}/meta.xml`, "utf-8"), {object: true}) as any;
            const title = obj.work.title;
            const img = `/works/${file}/` + obj.work.image;
            const description = obj.work.description;
            const categories = obj.work.categories.category;
            const url = obj.work.url;
            return {title, img, description, categories, href: url || undefined};
        });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method?.toUpperCase() !== "POST")
        return res.status(405).end();

    const {query, filters} = req.body as {query: string, filters: string[]};
    const works = loadWorks()
        .filter(work => {
            return (work.title.includes(query) || work.description.includes(query)) && filters.every(f => (work.categories as any).includes(f));
        });

    return res.status(200).json(works);
}

export {
    loadWorks,
}
