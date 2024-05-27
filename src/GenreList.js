import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GenreList.scss';

const GenreList = ({ books }) => {
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genresInfo = books.reduce((info, book) => {
        Array.isArray(book['ai-genres']) && book['ai-genres'].forEach(genre => {
            if (!info[genre]) {
                info[genre] = {
                    count: 0,
                    books: []
                };
            }
            info[genre].count++;
            info[genre].books.push({
                title: book.Title,
                author: book['Author (Last, First)'],
                isbn: book.ISBN,
                summary: book.Summary,
                aiSummary: book['ai-summary'],
                aiReview: book['ai-review'],
                shelf: book.Shelf
            });
        })
        return info;
    }, {});

    const sortedGenres = Object.keys(genresInfo).sort();

    return (
        <ul className="genre-list">
            {sortedGenres.map(genre => (
                <li key={genre}>
                    <a
                        href="#!"
                        onClick={() => { navigate(`/genre/${encodeURIComponent(genre)}`) }}
                    >
                        {genre} ({genresInfo[genre].count})
                    </a>
                    {selectedGenre === genre && (
                        <ul className="book-list">
                            {genresInfo[genre].books.map((book, index) => (
                                <li key={index} className="book-item">
                                    <img
                                        src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                                        alt={book.title}
                                        className="book-thumbnail"
                                    />
                                    <div className="book-info">
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
                    )}
                </li>
            ))}
        </ul>
    );
};

export default GenreList;
