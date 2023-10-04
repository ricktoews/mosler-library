import React from 'react';

function BookList({ books, openModal }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div key={index} className="book-item">
          <h3 onClick={() => openModal(book)}>{book.Title}</h3>
          <p>{book.Author}</p>
        </div>
      ))}
    </div>
  );
}

export default BookList;

