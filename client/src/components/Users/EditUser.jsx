import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

import './User.css';

class EditUser extends React.Component {

    state = {
        user: {},
        username: '',
        userpassword: '',
        userrole: 2,
        roles: this.props.data.role,
        show: this.props.data.show,
        user_id: this.props.data.user_id
    }

    handleChanges = (e) => {

        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }

    getUser = async () => {

        let id = this.props.data.user_id;
        console.log(id);
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
                username: data && data.user_name,
                password: data && data.user_password,
                userrole: data && data.user_role
            });
        }

    }

    saveEdit = (e) => {
        e.preventDefault();

        let err;
        let id = this.props.user_id;

        const changes = {
            user_name: this.state.user_name,
            user_password: this.state.user_password,
            user_role: this.state.user_role
        }

        console.log(changes);

        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
            }
        };

        axios.post(`http://localhost:8080/editUser/${id}`, changes, config)
            .then(res => {
                if (res.status >= 200) {
                    alert("Данные пользователя изменены");
                    this.setState({
                        show: false
                    });
                    this.getUser();
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

    componentWillMount = async () => {

            await this.getUser();
        
        
        console.log("dd",this.state.user);

    }

    render() {

        const roles = this.props.data.role;
        const show = this.props.data.show;
        const user = this.props.data.id;

        console.log("daaa", user)

        return (
            <div className={show ? "edit_user" : "edit_user--hide"}>
                <h3>Редактировать пользователя</h3>

                <form className="add_form" onSubmit={this.addUser}>
                    <label className="login_label">Логин: </label>
                    <input
                        className="login_input"
                        type="text"
                        name="username"
                        id="name" required
                        value={user && user.user_name}
                        onChange={this.handleChanges}
                    />
                    <label className="login_label">Пароль: </label>
                    <input
                        className="login_input"
                        type="password"
                        name="userpassword"
                        id="password" required
                        value={user && user.user_password}
                        onChange={this.handleChanges}
                    />
                    <select name="user_role" id="select" value={user && user.user_role} onChange={this.handleChanges}>
                        {
                            roles && roles.map((role) => {
                                return (

                                    <option
                                        className="roleoption"
                                        key={role.role_id}
                                        value={user && user.user_role == role.role_id} selected>
                                        {role.role_name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button
                        className="login_button add_button"
                        type="submit"
                    >Сохранить изменения
                            </button>
                </form>


            </div>
        )

    }
}

export default EditUser;