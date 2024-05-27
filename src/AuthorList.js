import React, { useState } from 'react';
import './AuthorList.scss';

const AuthorList = ({ books }) => {
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const authorsInfo = books.reduce((info, book) => {
        const author = book['Author (Last, First)'];

        if (!info[author]) {
            info[author] = {
                count: 0,
                name: author,
                books: []
            };
        }
        info[author].count++;
        info[author].books.push(book);
        return info;
    }, {});

    const authorSort = (a, b) => {
        if (!a || !b) return 1;

        if (a.count === b.count) return a.name < b.name ? -1 : 1;

        return a.count > b.count ? -1 : 1;
    }

    const sortedAuthors = Object.values(authorsInfo).sort(authorSort).filter(authorObj => authorObj.name);

    return (
        <ul className="author-list">
            {sortedAuthors.map(authorObj => {
                const author = authorObj.name;
                return (
                    <li key={author}>
                        <a
                            href="#!"
                            onClick={() => setSelectedAuthor(selectedAuthor === author ? null : author)}
                        >
                            {author} ({authorsInfo[author].count})
                        </a>
                        {selectedAuthor === author && (
                            <ul className="book-list">
                                {authorsInfo[author].books.map((book, index) => (
                                    <li key={index} className="book-item">
                                        <img
                                            src={`http://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg`}
                                            alt={book.Title}
                                            className="book-thumbnail"
                                        />
                                        <div className="book-info">
                                            <div className="title-shelf-isbn">
                                                {book.Title}
                                            </div>
                                            <div className="summary">
                                                {book.Summary}
                                            </div>
                                            <div className="shelf">
                                                {book.Shelf}
                                            </div>
                                            <div className="isbn">
                                                {book.ISBN}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )
            }
            )}
        </ul>
    );
};

export default AuthorList;
