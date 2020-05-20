import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import './lib.css';

import UserLibrary from './UserLibrary';

class Library extends React.Component {
    state = {
        books: [],
        userBooks: [],
        book_name: ''
    }

    getBooks = async () => {
        const res = await fetch('http://localhost:8080/library', {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            books: json
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
        const res = await fetch(`http://localhost:8080/searchbook?book_name=${this.state.book_name}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            books: json
        }); 
    }

    getUserBooks = async () => {
        const res = await fetch(`http://localhost:8080/userbook/${localStorage.getItem('user_id')}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('user_role')}`,
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        this.setState({
            userBooks: json
        });
    }

    deleteBook = () => {

    }

    componentWillMount = async() => {
        await this.getBooks();
        await this.getUserBooks();
        console.log(this.state.books)
    }

    componentDidUpdate(nextProps) {
		if(nextProps.location.state !== this.props.location.state){
			this.searchBook();			
		}
	}


    render() {

        const books = this.state.books;
        const role = localStorage.getItem('user_role') == 1 ? "Admin" : "USer";

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
                                    books && books.length ? books.map((book) => {
                                        return (
                                            <tr key={book.library_code} id={book.library_code}>
                                                <td>{book.library_code}</td>
                                                <td>{book.book_name}</td>
                                                <td>
                                                    { book.authors && book.authors.map(creator => {
                                                        return(
                                                            <p key={creator.author_id}>
                                                                {
                                                                    creator.author_name
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

                                <input type="text" name="book_name" value={this.state.book_name} onChange={this.handleChanges}/>
                                <button type="submit">
                                    Поиск
                                </button>
                            </form>

                        </div>


                        <UserLibrary books={this.state.userBooks}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Library);
