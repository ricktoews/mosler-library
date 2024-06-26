import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Hamburger from './components/Hamburger';
import Books from './Books';
import AuthorList from './AuthorList';
import Spotlight from './Spotlight';
import GenreList from './GenreList';
import Genre from './Genre';
import Share from './Share';

function App() {
  const [books, setBooks] = useState([]);
  const [spotlight, setSpotlight] = useState([]);
  const [menuState, setMenuState] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState('hamburger-nav');

  const navContainerRef = useRef(null);
  const hamburgerIconRef = useRef(null);

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

  useEffect(() => {
    fetch('/spotlight.json')
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => {
          const titleA = a.Title.replace(/^(the |a |an )/i, '').toLowerCase();
          const titleB = b.Title.replace(/^(the |a |an )/i, '').toLowerCase();
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
        });
        setSpotlight(data);
      });
  }, []);

  useEffect(() => {
    const handleClick = e => {
      const el = e.target;
      if (navContainerRef.current.contains(el)) {
        console.log('handleClick clicked in nav menu; leave open');
        setMenuState(true);
      } else {
        // Close outside of nav container. Close menu unless clicked on hamburger icon.
        if (!hamburgerIconRef?.current?.contains(el)) {
          setMenuState(false);
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  useEffect(() => {

    if (menuState === true) {
      navContainerRef.current.classList.add('show-nav-menu');
      navContainerRef.current.classList.remove('hide-nav-menu');
    } else {
      navContainerRef.current.classList.remove('show-nav-menu');
      navContainerRef.current.classList.add('hide-nav-menu');
    }

  }, [menuState]);

  const hamburgerClick = () => {
    console.log('hamburger clicked', hamburgerClass);
    if (hamburgerClass === 'hamburger-nav') {
      setHamburgerClass('hamburger-nav hamburger-on');
    } else {
      setHamburgerClass('hamburger-nav');
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    console.log('toggleMenu', !menuState);
    setMenuState(!menuState);
  }

  const checkMenuClick = e => {
    const el = e.target;
    const currentEl = e.currentTarget;
    if (el === currentEl) {
      setMenuState(false);
    }
  }

  return (
    <div className="App">
      <div ref={navContainerRef} onClick={checkMenuClick} className="nav-container">
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Books</Link></li>
            <li><Link to="/authors" onClick={toggleMenu}>Authors</Link></li>
            <li><Link to="/genres" onClick={toggleMenu}>Genres</Link></li>
            <li><Link to="/share" onClick={toggleMenu}>QR Code</Link></li>
          </ul>
        </nav>
      </div>
      <div className="fixed-header">
        <header>
          <Hamburger onClick={toggleMenu} />
          MOSLER LOFTS LIBRARY
        </header>
      </div>
      <div className="container app-content">
        <Routes>
          <Route path="/" element={<Books books={books} />} />
          <Route path="/spotlight" element={<Spotlight books={spotlight} />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/authors" element={<AuthorList books={books} />} />
          <Route path="/genres" element={<GenreList books={books} />} />
          <Route path="/genre/:genre" element={<Genre books={books} />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </div>
    </div>
  );

}

export default App;
