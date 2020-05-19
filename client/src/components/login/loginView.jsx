import React, { Component } from "react";
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

import './login.css';

class Login extends React.Component {

state = {
    user_name: '',
    user_password: '',
    user_id: 0,
    user_role: 0,
    message: '',
    error: false
};

handleChanges = (e) => {
   
    let name = e.target.name;
    this.setState({
        [name]: e.target.value
    });
    
}

login = (e) => {
    e.preventDefault();

    let err;
    const user = {
        user_name: this.state.user_name,
        user_password: this.state.user_password
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
                 localStorage.setItem('user_id', res.data.user_id);
                 localStorage.setItem('user_role', res.data.role_id);
                 console.log(localStorage.getItem('user_id'));
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
