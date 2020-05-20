import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

import './User.css';

class EditUser extends React.Component {

    state = {
        username: "",
        userpassword: "",
        userrole: null
    }

    handleChanges = (e) => {

        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }

    saveEdit = (e) => {
        e.preventDefault();

        let err;
        let id = this.props.edit.user_id;

        const changes = {
            user_name: this.state.username,
            user_password: this.state.userpassword,
            role_id: this.state.userrole
        }

        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
            }
        };

        axios.post(`http://localhost:8080/editUser/${id}`, changes, config)
            .then(res => {
                if (res.status >= 200) {
                   
                    alert("Данные пользователя изменены");
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

    render() {

        const roles = this.props.roles;
        const show = this.props.show;
        const user = this.props.edit;

        return (
            <div className={show ? "edit_user" : "edit_user--hide"}>
                <h3>Редактировать пользователя</h3>

                <form className="add_form" onSubmit={this.saveEdit}>
                    <label className="login_label">Логин: </label>
                    <input
                        className="login_input"
                        type="text"
                        name="username"
                        autocomplete={user && user.user_name}
                        id="name" required
                        value={this.state.username}
                        placeholder={user && user.user_name}
                        onChange={this.handleChanges}
                    />
                    <label className="login_label">Пароль: </label>
                    <input
                        className="login_input"
                        type="password"
                        name="userpassword"
                        autocomplete={user && user.user_password}
                        id="password" required
                        placeholder={user && user.user_password}
                        value={this.state.userpassword}
                        onChange={this.handleChanges}
                    />
                    <select name="userrole" id="select" value={this.state.userrole} onChange={this.handleChanges}>
                        {
                            roles && roles.map((role) => {
                                return (

                                    <option
                                        className="roleoption"
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
                    >Сохранить изменения
                            </button>
                </form>


            </div>
        )

    }
}

export default EditUser;