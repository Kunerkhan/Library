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
        const role = localStorage.getItem('userRole') == 1 ? "Admin" : "User";

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
                                <tr key={book.bookId} id={book.bookId}>
                                    <td>{i+1}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.authors && book.authors.map(creator => {
                                        return(
                                            <p key={creator.authorId}>
                                                {
                                                 creator.authorName
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
