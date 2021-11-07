import App from './app/app'

const PORT = 3001

const app = new App()

app.listen(PORT, () => {
    console.log('app listening on port', PORT)
})
