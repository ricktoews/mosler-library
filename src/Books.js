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
        } else {
            bookDropdownRef.current.style.display = 'none';
        }
    }

    const shelfFilter = shelf => {
        const filtered = shelf === 'Library' ? books : books.filter(item => item.Shelf === shelf);
        setLibraryBooks(filtered);
        setBookLocation(shelf);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(80,80,80,.1)', position: 'relative', marginBottom: '5px' }}>
                <div>Search: <input onChange={handleBookSearch} type="text" id="search" name="search" /></div>

                <div ref={bookDropdownRef} style={{ display: 'none', flexGrow: 1, marginBottom: '20px', position: 'absolute', top: 'calc(100% + 2px)', left: '0px', padding: '5px', border: '1px solid #ccc', background: '#fff', overflowY: 'auto' }} className="book-dropdown-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Shelf</th>
                                <th>Title</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((item, key) => {
                                return (<tr key={key} data-id={item.Title} style={{ borderBottom: '1px solid #ccc' }}>
                                    <td>{item.Shelf}</td>
                                    <td>{item.Title}</td>
                                    <td>{item['Author (Last, First)']}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
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
