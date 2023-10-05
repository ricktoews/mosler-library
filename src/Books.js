import { useEffect, useState } from "react";
import Book from "./Book";
import ShelfSelector from "./ShelfSelector";

const Books = ({ books }) => {
    const [ libraryBooks, setLibraryBooks ] = useState([]);
    const [ bookLocation, setBookLocation ] = useState('');

    useEffect(() => {
        setLibraryBooks(books);
        setBookLocation('Library');
    }, [books]);

    const shelfFilter = shelf => {
        const filtered = books.filter(item => item.Shelf === shelf);
        setLibraryBooks(filtered); 
        setBookLocation(shelf);
    }

    return (
        <div>
            <div className="shelf-selector">
                <ShelfSelector shelfFilter={shelfFilter} />
            </div>
            <div>
                Location: {bookLocation}; Books in this location: {libraryBooks.length}
            </div>
            {libraryBooks.map((book, index) => (
                <Book key={index} shelfFilter={shelfFilter} book={book} />
            ))}
        </div>
    );
};


export default Books;
