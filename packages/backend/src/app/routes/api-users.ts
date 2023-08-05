import { getCollection } from '../../index'
const jwt = require("jsonwebtoken");
import { TOKEN_KEY } from '../../index'


export function Login() {
    return async (ctx) => {
        const collection = await getCollection('users')

        const result = await collection.findOne({ login: ctx.request.body.login, password: ctx.request.body.password })
        if (!result) {
            ctx.status = 400
            ctx.body ="Такого пользователя нет в базе"
            return
        }
        const token = jwt.sign(
            { user_id: result._id, login: result.login },
                TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        ctx.status = 200
        ctx.body = token
    }
}