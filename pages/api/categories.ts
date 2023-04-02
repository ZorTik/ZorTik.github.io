import {NextApiRequest, NextApiResponse} from "next";
import {loadWorks} from "./works";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories: string[] = [];
    loadWorks().forEach(work => (work.categories as any).forEach((c: any) => {
        if (!categories.includes(c)) categories.push(c);
    }))
    return res.status(200).json(categories);
}
