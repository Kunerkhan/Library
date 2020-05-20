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
        user_role: null,
        roles: [],
        user_id: 0,
        user_edit: {},
        show: false
    }

    getUsers = async () => {
        const res = await fetch('http://localhost:8080/users', {
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

    editUser = async(id) => {



        if(!this.state.show)
        {
            this.setState({
                show: true
            });
            await this.getUserById(id);
        }
        else 
        {
           this.setState({
                show: false
            });
          await this.getUsers();
        }

    }

    addUser = (e) => {
        e.preventDefault();

        let err;
        const user = {
            user_name: this.state.user_name,
            user_password: this.state.user_password,
            role_id: this.state.user_role
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

    getUserById = async (id) => {

        if(id)
        {
            const res = await fetch(`http://localhost:8080/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${localStorage.getItem('user_role')}`,
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            const data = json;
            this.setState({
                user_edit: json
            });
        }

    }

    componentWillMount = () => {
        this.getUsers();
        this.getRoles();
        
    }

    render() {

        const users = this.state.users;
        const roles = this.state.roles;

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
                                    users && users.length ? users.map((user, i) => {
                                        return (
                                            <tr key={user.user_id} id={user.user_id}>
                                                <td>{i + 1}</td>
                                                <td>{user.user_name}</td>
                                                <td>{user.user_password}</td>
                                                <td>{user.role_id == 1 ? 'Admin' : 'User'}</td>
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

                        <EditUser 
                            edit={this.state.user_edit && this.state.user_edit} 
                            show={this.state.show} 
                            roles={this.state.roles && this.state.roles}
                            />

                        <div className="add_div">
                            <h2 className="Add_USER">Добавить Пользователя</h2>
                            <form className="add_form" onSubmit={this.addUser} autocomplete="off">
                                <label className="login_label">Логин: </label>
                                <input
                                    className="login_input"
                                    type="text"
                                    name="user_name"
                                    id="name" required
                                    autocomplete="user_name"
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
