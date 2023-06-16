import { Request, Response, NextFunction } from 'express';
import userService from '../service/userService';
import { ApiError } from '../exceptions/apiError';

const { validationResult } = require('express-validator');


class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            console.log('EMAIL', email);
            console.log('password', password);
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true

            });

            return res.json(userData);


        } catch (error) {
            next(error);
            console.log(error);

        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true

            });

            return res.json(userData);


        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);



        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true

            });

            return res.json(userData);


        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (error) {
            console.log(error);
        }
    }

}

export default new UserController();