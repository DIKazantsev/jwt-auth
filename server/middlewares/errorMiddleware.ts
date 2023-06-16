import { ApiError } from "../exceptions/apiError";
import { Request, Response, NextFunction } from 'express';

module.exports = function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    console.log('err', err.message);

    return res.status(500).json({ message: err.message })
}