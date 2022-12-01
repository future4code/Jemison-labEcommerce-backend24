
import {Request, Response} from "express"
import { connection } from "../connection"
import { character } from "../types"

export default async function (
    req: Request,
    res: Response
): Promise<void> {

    try{
    const {name, oderBy, orderType, page} = req.query

    const resultsPerPage = 5

    const offset = resultsPerPage * (Number(page) - 1)

    const characters: character[] = await connection("character")
    .where("name", "LIKE", `%${name}%`)
    .orderBy(oderBy as string || "name", orderType as string)
    .offset(offset)


    res.send(characters)
} catch (error) {
    res.status(500).send("Unexpected server error")
}
}
