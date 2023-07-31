import { getCollection } from '../../index'
const jwt = require("jsonwebtoken");


export function Login() {
    return async (ctx, req) => {
        const collection = await getCollection('users')
        const result = await collection.findOne({ login: req.body.login, password: req.body.password })
        if (!result) {
            ctx.status(400).send("Такого пользователя нет в базе");
        }
        const token = jwt.sign(
            { user_id: result._id, login: result.login },
                process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        ctx.status(200).json(token);
    }
}