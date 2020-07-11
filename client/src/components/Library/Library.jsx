import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import './lib.css';

import UserLibrary from './UserLibrary';

class Library extends React.Component {
    state = {
        books: [],
        userBooks: [],
        bookName: ''
    }

    getBooks = async () => {
        const res = await fetch('http://localhost:8080/library', {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('userRole')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            books: json
        });
    }

    getUserBooks = async () => {
        const res = await fetch(`http://localhost:8080/userbook/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('userRole')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            userBooks: json
        });
    }


    handleChanges = (e) => {

        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }

    searchBook = async(e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8080/searchbook?bookName=${this.state.bookName}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('userRole')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            books: json
        }); 
    }

    deleteBook = () => {

    }

    componentWillMount = async() => {
        await this.getBooks();
        await this.getUserBooks();

        console.log(this.state.userBooks)
    }

    componentDidUpdate(nextProps) {
		if(nextProps.location.state !== this.props.location.state){
			this.searchBook();			
		}
	}


    render() {

        const books = this.state.books;
        const role = localStorage.getItem('userRole') == 1 ? "Admin" : "USer";

        return (
            <div class="main">
                <div class="container">
                    <div class="main_table_lib">
                        <div className="main_library">
                            <h2>Книги</h2>
                            <table>
                                <tr className="tr_user">
                                    <th className="td_user">№</th>
                                    <th className="td_user">Название</th>
                                    <th className="td_user">Автор</th>
                                    <th className={role == "Admin" ? "td_user" : "restricted"}>Действия</th>

                                </tr>
                                {
                                    books && books.length ? books.map((book, i) => {
                                        return (
                                            <tr key={book.id} id={book.id}>
                                                <td>{i+1}</td>
                                                <td>{book.bookName}</td>
                                                <td>
                                                    { book.authors && book.authors.map(creator => {
                                                        return(
                                                            <p key={creator.authorId}>
                                                                {
                                                                    creator.authorName
                                                                }
                                                            </p>
                                                        )
                                                    })}
                                                </td>
                                                {role == "Admin" ? (
                                                    <td>
                                                        <button onClick={this.deleteBook}>Удалить</button>
                                                        <button onClick={this.editBook}>Редактировать</button>
                                                        <button onClick={this.addBook}>Добавить книгу</button>
                                                    </td>                                                    
                                                ) : (
                                                    <td>
                                                        <button onClick={this.addBook}>Добавить книгу</button>
                                                    </td>                                                    
                                                ) }

                                            </tr>
                                        )
                                    }) : "Книг нету"
                                }

                            </table>
                        </div>
                        <div className="search_book">
                            <form className="add_form" onSubmit={this.searchBook}>

                                <input type="text" name="bookName" value={this.state.bookName} onChange={this.handleChanges}/>
                                <button type="submit">
                                    Поиск
                                </button>
                            </form>

                        </div>


                        <UserLibrary userBooks={this.state.userBooks}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Library);
