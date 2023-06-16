import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';



const App: FC = () => {

    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }

    }, [])


    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data)
        } catch (error) {
            console.log(error);

        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return <LoginForm />
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
                {users.map(user =>
                    <div key={user.id}>{user.email}</div>

                )}
            </div>
        </div>
    )
}


export default observer(App);