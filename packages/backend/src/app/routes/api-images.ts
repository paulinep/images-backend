import { getCollection } from '../../index'

export  function GetImages() {
    return async (ctx) => {
        const collection = await getCollection('images')
        const result = await collection.find({}).
            limit(ctx.query && Number(ctx.query.perPage) || 10).
            skip(ctx.query && Number(ctx.query.page * ctx.query.perPage)  || 0).
            toArray()
        let count = await collection.aggregate([
            {$match: { }},
            {$count: 'count'}
        ]).toArray()
       ctx.body = {
           items: result,
           page: ctx.query && ctx.query.page || 1,
           perPage: ctx.query && ctx.query.perPage || 10,
           sort: ctx.query && ctx.query.sort || null,
           itemsCount: count.length ? count[0].count : 0,
        }
    }
}
export  function GetImage() {
    return async (ctx, id) => {
        const collection = await getCollection('images')
        ctx.body= await collection.findOne({ id: Number(id) })
    }
}

export  function DeleteImage() {
    return async (ctx, id) => {
        const collection = await getCollection('images')
        await collection.deleteOne({ id: Number(id) })
        ctx.body= null
        ctx.status = 204
    }
}

export function callPython () {
    return async (ctx, res) => {
        let spawn = require('child-process-promise').spawn;
        let process = spawn('python',['../hello.py', ctx.query.videoname]);
        let childProcess = process.childProcess;
        let result
        childProcess.stdout.on('data', function (data) {
            console.log('[spawn] stdout: ', data.toString());
            result = data.toString()
        });
        childProcess.stderr.on('data', function (data) {
            console.log('[spawn] stderr: ', data.toString());
            result = data.toString()
        });
        process.then(function () {
            console.log('[spawn] done!');
            ctx.body= result
        })
            .catch(function (err) {
                console.error('[spawn] ERROR: ', err);
            });

        ctx.status = 200

    }

}