const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);

export  function GetImages() {
    return async (ctx) => {
        const client = await mongoClient.connect();
        const db = client.db("images");
        const collection = db.collection("images");
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
        const client = await mongoClient.connect();
        console.log(id)
        const db = client.db("images");
        const collection = db.collection("images");
        console.log(await collection.findOne({ id: id }))
        ctx.body= await collection.findOne({ id: Number(id) })
    }
}

export  function DeleteImage() {
    return async (ctx, id) => {
        const client = await mongoClient.connect();
        const db = client.db("images");
        const collection = db.collection("images");
        await collection.deleteOne({ id: Number(id) })
        ctx.body= null
        ctx.status = 204
    }
}