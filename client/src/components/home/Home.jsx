import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import './table.css';
import './style.css';

class Home extends React.Component {
  state = {
    role: localStorage.getItem('userRole') == 1 ? 'Admin' : "User"
  }


  render() {

  const role = this.state.role;
    return(
      <div>
        <div className="main">
          <div className="container">
            <div>
              <h1>
                Добро пожаловать в Библиотеку!
              </h1>
            </div>
            <ul className="main_ul">
              <li className={role == "Admin" ? "main_ul_li" : "restricted"}>
                <Link to="/users" className="main">
                  Пользователи
                </Link>
              </li>
              <li className="main_ul_li">
                <Link to="/library" className="main">
                    Библиотека
                 </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;

