import React, { useState, useEffect } from 'react';
import './App.css';
import Book from './Book';

const App = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/mosler-books.json')
            .then((res) => res.json())
            .then((data) => {
                data.sort((a, b) => {
                    const titleA = a.Title.replace(/^(the |a |an )/i, '').toLowerCase();
                    const titleB = b.Title.replace(/^(the |a |an )/i, '').toLowerCase();
                    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
                });
                setBooks(data);
            });
    }, []);

    return (
        <div className="App">
            {books.map((book, index) => (
                <Book key={index} book={book} />
            ))}
        </div>
    );
};

export default App;

