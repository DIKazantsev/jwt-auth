import { ApiError } from "../exceptions/apiError";
import { Request, Response, NextFunction } from 'express';
import tokenService from "../service/tokenService";

module.exports = function (req: any, res: Response, next: NextFunction) {
    try {
        console.log('Auth MIDDLEWARE>>>>>>>>>>>>>>>>');

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData;
        next();


    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }

}