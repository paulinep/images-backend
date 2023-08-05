import App from './app/app'

const PORT = 3001

const app = new App()
export const { SESSION_SECRET } = process.env
export const { TOKEN_KEY } = process.env
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);
export async function getCollection(name) {
    const client = await mongoClient.connect();
    const db = client.db("images");
    return  db.collection(name);
}


app.listen(PORT, () => {
    console.log('app listening on port', PORT)
})
