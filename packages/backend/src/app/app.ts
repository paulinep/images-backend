import Koa from 'koa'
import KoaBodyparser from 'koa-bodyparser'
import KoaSession from 'koa-session'
import Passport from 'koa-passport'
import Route from 'koa-route'


import { DeleteImage, GetImage, GetImages } from './routes/api-images'


const { SESSION_SECRET } = process.env

export default class App extends Koa {
    constructor() {
        super()

        this.keys = [SESSION_SECRET!]

        this.use(KoaSession({}, this))
        this.use(KoaBodyparser())

        this.use(Passport.initialize())
        this.use(Passport.session())

        this.use(Route.get('/api/images', GetImages()))
        this.use(Route.get('/api/images/:id', GetImage()))
        this.use(Route.delete('/api/images/:id', DeleteImage()))

    }
}
