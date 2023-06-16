import { Token } from "../models/Token";
import { User } from "../models/User";

var jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30s'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData: any = await Token.findOne({
            where: {
                userId: userId
            }
        })

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({
            userId: userId,
            refreshToken: refreshToken
        })
        return token;
    }
    async removeToken(refreshToken: string) {
        const tokenData: any = await Token.destroy({
            where: {
                refreshToken: refreshToken
            }
        })
        return tokenData;
    }


    async findToken(refreshToken: string) {
        const tokenData: any = await Token.findOne({
            where: {
                refreshToken: refreshToken
            }
        })

        return tokenData;
    }


    validateAccessToken(accessToken: string) {
        try {
            const userData: any = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;

        } catch (error) {
            return null;
        }
    }
    validateRefreshToken(refreshToken: string) {
        try {
            const userData: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;

        } catch (error) {
            return null;
        }
    }
}


export default new TokenService();