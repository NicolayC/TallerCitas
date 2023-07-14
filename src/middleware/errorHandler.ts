import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
    constructor (public statusCode: number, public message: string){
        super(message)
        this.name = 'CustomError'
    }
}

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({error: err.message})
    } else {
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export {errorHandlerMiddleware}