import { Token } from "./Token"
import { User } from "./User"

export const addRelations = () => {

    User.hasMany(Token, {
        foreignKey: 'userId',
        as: 'token'
    })

    Token.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    })

}
