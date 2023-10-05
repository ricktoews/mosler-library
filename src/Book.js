import React from 'react';
import './Book.css';

const Book = ({ book }) => {
    const { Title, 'Author (Last, First)': author, Summary, Genre, ISBN, Shelf } = book;
    const coverUrl = ISBN ? `http://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg` : '';

    return (
        <div className="book">
            <div className="book-cover-wrapper">
                <img src={coverUrl} alt="Book cover" className="book-cover" />
            </div>
            <div className="book-info">
                <div className="title-author">
                    <strong>{Title}</strong><br/>
                    <span style={{ fontSize: 'medium' }}>by {author}</span>
                </div>
                <div className="summary" style={{ fontSize: 'small' }}>
                    {Summary}
                </div>
                <div className="genre">
                    <strong>Genre:</strong> {Genre}<br/>
                    <strong>Location:</strong> {Shelf}<br/>
                    <strong>ISBN:</strong> {ISBN}<br/>
                </div>
            </div>
        </div>
    );
};

export default Book;

