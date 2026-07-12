import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import type { ErrorRequestHandler } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import giftRouter from './routes/git.route.js'
import { ApiError } from './utils/ApiError.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');


app.use(express.json({
    limit: '16kb'
}))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.static(publicDir));

app.use(cookieParser())

// routes
app.use('/api/v1', giftRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        errors: err instanceof ApiError ? err.errors : [],
    });
}

app.use(errorHandler)

export {app};
