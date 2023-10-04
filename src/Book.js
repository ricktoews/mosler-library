import React from 'react';
import './Book.css';

const Book = ({ book }) => {
    const { Title, 'Author (Last, First)': author, Summary, Genre, ISBN, Shelf } = book;
    const coverUrl = ISBN ? `http://covers.openlibrary.org/b/isbn/${ISBN}-S.jpg` : '';

    return (
        <div className="book">
            <div>
                <img src={coverUrl} alt="Book cover" className="book-cover" />
            </div>
            <div className="book-info">
                <div className="title-author">
                    <strong>{Title}</strong> by {author}
                </div>
                <div className="summary" style={{ fontSize: 'small' }}>
                    {Summary}
                </div>
                <div className="genre">
                    <strong>Genre:</strong> {Genre}<br/>
                    <strong>Location:</strong> {Shelf}<br/>
                </div>
            </div>
        </div>
    );
};

export default Book;

