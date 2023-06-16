import { ApiError } from "../exceptions/apiError";
import { User } from "../models/User";
import tokenService from "./tokenService";

const bcrypt = require('bcrypt');
const uuid = require('uuid');

class UserService {
    async registration(email: string, password: string) {
        const candidate = await User.findOne({
            where: {
                email: email
            }
        })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        console.log('hashPassword', hashPassword);


        const user: any = await User.create({
            email: email,
            password: hashPassword,
            activationLink: activationLink
        })

        //await MailService.sendActivationLink(email, activationLink)

        const tokens = tokenService.generateTokens({ id: user.id, email: email });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }


    async login(email: string, password: string) {
        const user: any = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} не найден`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Некорректный пароль`);
        }

        const tokens = tokenService.generateTokens({ id: user.id, email: email });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }



    async logout(refreshToken: string) {

        const token = await tokenService.removeToken(refreshToken);
        return token;

    }
    async refresh(refreshToken: string) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData: any = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);


        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }


        const user: any = await User.findOne({
            where: {
                id: userData.id
            }
        })
        const tokens = tokenService.generateTokens({ id: user.id, email: user.email });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }
    async getAllUsers() {
        const users = await User.findAll();
        return users;

    }




}


export default new UserService();