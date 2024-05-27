import React, { useState } from 'react';
import './GenreList.scss';

const Spotlight = ({ books }) => {
    console.log('====> Spotlight', books);
    const spotlight = books.map(book => {
        return {
            title: book.Title,
            author: book.Author,
            isbn: book.ISBN,
            summary: book.Summary,
            shelf: book.Shelf,
            spotlight: book.spotlight
        }
    });
    return (
        <div>
            <h1>Spotlight</h1>
            <ul className="spotlight">
                <li>
                    <ul className="book-list">
                        {spotlight.map((book, index) => (
                            <li key={index} className="book-item">
                                <div className="book-info">
                                    <div dangerouslySetInnerHTML={{ __html: book.spotlight }}></div>
                                    <img
                                        src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                                        alt={book.title}
                                        className="book-thumbnail"
                                    />
                                    <div className="title-author">
                                        {book.title} by {book.author}
                                    </div>
                                    <div className="book-summary">
                                        {book.summary}
                                    </div>
                                    <div className="book-isbn">
                                        {book.isbn}
                                    </div>
                                    <div className="book-shelf">
                                        {book.shelf}
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Spotlight;
