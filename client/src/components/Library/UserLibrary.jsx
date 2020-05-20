import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Library extends React.Component {
    state = {
        userBooks: []
    }

    deleteBook = () => {

    }

    render() {

        const books = this.props.userBooks;
        console.log(books);
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
                        books && books.length ? books.map((book, i) => {
                            return (
                                <tr key={book.book_id} id={book.book_id}>
                                    <td>{i+1}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.authors && book.authors.map(creator => {
                                        return(
                                            <p key={creator.author_id}>
                                                {
                                                 creator.author_name
                                                }
                                            </p>
                                        )
                                    })}</td>
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
