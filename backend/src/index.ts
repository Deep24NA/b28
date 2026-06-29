import 'dotenv/config';
import dbConnection from "./db/index.js";
import {app} from '../src/app.js'

dbConnection()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log('server is running at port : ', process.env.PORT)
    })
})
.catch((err) => {
    console.log("MongoDb connection problem: ", err)
})