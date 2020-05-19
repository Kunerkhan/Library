import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Library extends React.Component {
    state = {
        userBooks: []
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
        await this.getUserBooks();
        console.log(this.state.userBooks)
    }

    render() {

        const books = this.props.books;
        const role = localStorage.getItem('user_role') == 1 ? "Admin" : "User";

        return (
            <div className="user_library">
                <h2>Мои книги</h2>
                <table>
                    <tr className="tr_user">
                        <th className="td_user">№</th>
                        <th className="td_user">Название</th>
                        <th className="td_user">Автор</th>
                        <th className="td_user">Действия</th>

                    </tr>
                    {
                        books && books.length ? books.map((book) => {
                            return (
                                <tr key={book.library_code} id={book.library_code}>
                                    <td>{book.library_code}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.author_name}</td>
                                    <td>
                                        <button onClick={this.deleteBook}>Удалить</button>
                                        <button onClick={this.editBook}>Редактировать</button>
                                    </td>
                                </tr>
                            )
                        }) : "Книг нету"
                    }






                </table>
            </div>

        )
    }
}

export default Library;
