import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import prodcutRoute from "./routes/product"
import ordersRoute from "./routes/orders"
import usersRoute from "./routes/users"

const app: express.Application = express()
let address: string = "0.0.0.0:3000"
let port: number = 3000
if (process.env.ENV === "test") {
    address = "0.0.0.0:3001"
    port = 3001;
}
app.use(bodyParser.json())
app.use("/products", prodcutRoute)
app.use("/orders", ordersRoute)
app.use("/users", usersRoute)
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
export default app
