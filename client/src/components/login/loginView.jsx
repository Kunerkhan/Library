import React, { Component } from "react";
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

import './login.css';

class Login extends React.Component {

state = {
    userName: '',
    userPassword: '',
    userId: 0,
    userRole: 0,
    message: '',
    error: false
};

handleChanges = (e) => {
   
    let name = e.target.name;
    this.setState({
        [name]: e.target.value
    });
    console.log(this.state.userPassword)
}

login = (e) => {
    e.preventDefault();

    let err;
    const user = {
        userName: this.state.userName,
        userPassword: this.state.userPassword
    }

    console.log(user);

    const config = {
        headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    };

    axios.post('http://localhost:8080/login', user, config)
    .then(res =>  {
             if(res.status >= 200)
             {	
                 
                console.log(res);
                 localStorage.setItem('userId', res.data.userId);
                 localStorage.setItem('userRole', res.data.roleId);
                 console.log(localStorage.getItem('userId'));
                 this.props.history.push('/');
             }
             if(res.status == 400)
             {
                 console.log(res.statusText);
                 err = res.non_field_errors.toString();
                 return err;
             }
         }
    )
    .catch(error=> {
        console.log(error)
        // if(error.response.status == 500)
        // {
        //     this.setState({message: "Error ", error: true});
        // }     
    });
};

hideError = () => {
    this.setState({error: false});
}
    render() {

    let error = this.state.error;    
        return(
            <div className="main">
                <div className="container">
                    <div className="login_user">

                        <form className="login_form" onSubmit={this.login}>
                            <label className="login_label">Логин: </label>
                            <input 
                            className="login_input" 
                            type="text" 
                            name="userName" 
                            id="name" required 
                            value={this.state.userName}
                            onChange={this.handleChanges}
                            />
                            <label className="login_label">Пароль: </label>
                            <input 
                            className="login_input" 
                            type="password" 
                            name="userPassword" 
                            id="password" required 
                            value={this.state.userPassword}
                            onChange={this.handleChanges}
                            />
                            <button 
                                className="login_button"
                                type="submit"
                                >Войти</button>
                        </form>
                        
                        <div className={error ? "login_error" : "login_error--hide"}>
                             <h3>Ошибка!</h3>
                             <p>{this.state.message}</p>
                            <button className="login_button" onClick={this.hideError}>Ок!</button>
                        </div>
                    
                    </div>
            
                </div>
            </div>
       
        )
    }
}

export default withRouter(Login);
