import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

import EditUser from './EditUser';
import './User.css';

class User extends React.Component {
    state = {
        users: [],
        user_name: '',
        user_password: '',
        user_role: 2,
        roles: [],
        user_id: 0,
        user: {}
    }

    getUsers = async () => {
        const res = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            users: json
        });
    }

    deleteUser = (id) => {

        let err;

        axios.post(`http://localhost:8080/deleteUser/${id}`, id, {
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
            }
        })
            .then(res => {
                if (res.status >= 200) {

                    console.log(res);
                    alert('Пользователь удален успешно');
                    this.getUsers();
                }
                if (res.status >= 401) {
                    console.log(res.statusText);
                    err = res.non_field_errors.toString();
                    return err;
                }
            }
            )
            .catch(error => {
                console.log(error)
                // if(error.response.status == 500)
                // {
                //     this.setState({message: "Error ", error: true});
                // }     
            });
    }

    editUser = (id) => {

        this.getUser();

        this.setState({
            show: true,
            user_id: id
        });

        if(this.state.show)
        {
            this.setState({
                show: false
            });
        }
    }

    addUser = (e) => {
        e.preventDefault();

        let err;
        const user = {
            user_name: this.state.user_name,
            user_password: this.state.user_password,
            user_role: this.state.user_role
        }

        console.log(user);

        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
            }
        };

        axios.post('http://localhost:8080/addUser', user, config)
            .then(res => {
                if (res.status >= 200) {
                    alert("Пользователь добавлен");
                    this.getUsers();
                }
                if (res.status == 400) {
                    console.log(res.statusText);
                    err = res.non_field_errors.toString();
                    return err;
                }
            }
            )
            .catch(error => {
                console.log(error)
                // if(error.response.status == 500)
                // {
                //     this.setState({message: "Error ", error: true});
                // }     
            });
    }

    handleChanges = (e) => {

        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }

    getRoles = async () => {
        const res = await fetch('http://localhost:8080/roles')
        const json = await res.json();
        this.setState({
            roles: json
        });
    }

    getUser = async () => {

        let id = this.state.user_id;
        console.log(id)
        const res = await fetch(`http://localhost:8080/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            user: json
        });
    }

    componentWillMount = () => {
        this.getUsers();
        this.getRoles();
    }

    render() {

        const users = this.state.users;
        const roles = this.state.roles;

        console.log()

        let child ={
            id: this.state.user, 
            role: this.state.roles,
            show: this.state.show
        }

        return (
            <div className="main">
                <div className="container">
                    <div className="user">
                        <div className="main_table">
                            <h2>Пользователи</h2>
                            <table>
                                <tr className="tr_user">
                                    <th className="td_user">№</th>
                                    <th className="td_user">Имя</th>
                                    <th className="td_user">Пароль</th>
                                    <th className="td_user">Роль</th>
                                    <th className="td_user">Действия</th>
                                </tr>
                                {
                                    users && users.length ? users.map((user) => {
                                        return (
                                            <tr key={user.user_id} id={user.user_id}>
                                                <td>{user.user_id}</td>
                                                <td>{user.user_name}</td>
                                                <td>{user.user_password}</td>
                                                <td>{user.user_role == 1 ? 'Admin' : 'User'}</td>
                                                <td>
                                                    <button onClick={(e) => this.deleteUser(user.user_id)}>Удалить</button>
                                                    <button onClick={(e) => this.editUser(user.user_id)}>Редактировать</button>
                                                </td>
                                            </tr>
                                        )
                                    }) : "Пользователей нет"
                                }

                            </table>
                        </div>

                        <EditUser data={child} />

                        <div className="add_div">
                            <h2 className="Add_USER">Добавить Пользователя</h2>
                            <form className="add_form" onSubmit={this.addUser}>
                                <label className="login_label">Логин: </label>
                                <input
                                    className="login_input"
                                    type="text"
                                    name="user_name"
                                    id="name" required
                                    value={this.state.user_name}
                                    onChange={this.handleChanges}
                                />
                                <label className="login_label">Пароль: </label>
                                <input
                                    className="login_input"
                                    type="password"
                                    name="user_password"
                                    id="password" required
                                    value={this.state.user_password}
                                    onChange={this.handleChanges}
                                />
                                <select name="user_role" id="select" value={this.state.user_role} onChange={this.handleChanges}>
                                    {
                                        roles && roles.map((role) => {
                                            return (

                                                <option
                                                    className="role_option"
                                                    key={role.role_id}
                                                    value={role.role_id}
                                                    selected>
                                                    {role.role_name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                                <button
                                    className="login_button add_button"
                                    type="submit"
                                >Добавить Пользователя
                            </button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default User;
