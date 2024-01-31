import { useRef, useEffect, useState } from "react";
import Book from "./Book";
import ShelfSelector from "./ShelfSelector";

const Books = ({ books }) => {
    const [libraryBooks, setLibraryBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookLocation, setBookLocation] = useState('');

    const bookDropdownRef = useRef();

    useEffect(() => {
        setLibraryBooks(books);
        setFilteredBooks(books);
        setBookLocation('Library');
    }, [books]);

    const bookSearchFilter = str => {
        return (item) => {
            const searchFor = str.toLowerCase();

            const author = item['Author (Last, First)'];
            const title = item.Title;
            const searchFields = [title.toLowerCase(), author.toLowerCase()];

            let filtered = false;
            searchFields.forEach(field => {
                filtered = filtered || field.indexOf(searchFor) !== -1;
            })

            return filtered;
        }
    }


    const handleBookSearch = event => {
        const el = event.currentTarget;
        const value = el.value || '';
        if (value.length >= 3) {
            console.log('==== handleBookSearch value', value);
            const _filteredBooks = libraryBooks.filter(bookSearchFilter(value));
            console.log('==== handleBookSearch filtered books', _filteredBooks);
            bookDropdownRef.current.style.display = 'block';
            setFilteredBooks(_filteredBooks);
        }
    }

    const shelfFilter = shelf => {
        const filtered = shelf === 'Library' ? books : books.filter(item => item.Shelf === shelf);
        setLibraryBooks(filtered);
        setBookLocation(shelf);
    }

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <div>Search: <input onChange={handleBookSearch} type="text" id="search" name="search" /></div>

                <div ref={bookDropdownRef} style={{ display: 'none', position: 'absolute', top: 'calc(100% + 2px)', left: '64px', width: '350px', height: '100px', padding: '5px', border: '1px solid #ccc', background: '#fff', overflowY: 'auto' }} className="book-dropdown-wrapper">
                    {filteredBooks.map((item, key) => {
                        return (<div key={key} data-id={item.Title} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}>
                            {item.Shelf} - {item.Title} - {item['Author (Last, First)']}
                        </div>)
                    })}
                </div>
            </div>

            <div className="shelf-selector">
                <ShelfSelector shelfFilter={shelfFilter} />
            </div>
            <div className="shelf-selector">
                Location: {bookLocation}; Books in this location: {libraryBooks.length}
            </div>
            {libraryBooks.map((book, index) => (
                <Book key={index} shelfFilter={shelfFilter} book={book} />
            ))}
        </div>
    );
};


export default Books;
