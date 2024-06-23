import { getCollection } from '../../index'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../../index'
import { ObjectId } from 'mongodb';


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
                user: { profile: result }
            }
        }
    }
}

export function getCurrentUser() {
    return async (ctx) => {
        const collection = await getCollection('users');
        try {
            let decoded = jwt.verify(ctx.request.header['x-token'], TOKEN_KEY);
            const result = await collection.findOne({ _id: new ObjectId(decoded.user_id) })
            if (!result) {
                ctx.status = 403
                ctx.body ="Такого пользователя нет в базе"
                return
            }
            ctx.set('Content-type', 'application/json');
            ctx.status = 200
            ctx.body = { result: result };
        } catch (error) {
            console.log(error)
            ctx.set('Content-type', 'application/json');
            ctx.status = 403
            ctx.body ="Такого пользователя нет в базе"
            return
        }

    }
}