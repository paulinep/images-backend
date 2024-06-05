import { getCollection } from '../../index'
const jwt = require("jsonwebtoken");
import { TOKEN_KEY } from '../../index'


export function Login() {
    return async (ctx) => {
        const collection = await getCollection('users')

        const result = await collection.findOne({ login: ctx.request.body.login, password: ctx.request.body.password })
        if (!result) {
            ctx.status = 401
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
        ctx.set('Content-type', 'application/json');
        ctx.status = 200
        ctx.body = {
            result : {
                token: token,
                user: result
            }
        }
    }
}

export function getCurrentUser() {
    return async (ctx) => {
        const collection = await getCollection('users');
        try {
            let decoded = jwt.verify(ctx.request.headers['Access-Token'], TOKEN_KEY);
            const result = await collection.findOne({ user_id: decoded.user_id })
            if (!result) {
                ctx.status = 403
                ctx.body ="Такого пользователя нет в базе"
                return
            }
            ctx.set('Content-type', 'application/json');
            ctx.status = 200
            ctx.body = result;
        } catch (error) {
            ctx.status = 403
            ctx.body ="Такого пользователя нет в базе"
            return
        }

    }
}