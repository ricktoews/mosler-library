import React from 'react';
import { useState } from 'react';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 40px)',
    gridGap: '10px',
    border: '1px solid black',
    padding: '10px'
  },
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8em'
  },
  floorButton: {
    gridRow: 'span 3',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8em',
    border: 'none',
    borderRadius: '5px',
  }

};

const ShelfSelector = ({ shelfFilter }) => {
  const [location, setLocation] = useState('');
  const rows = ['1', '2', '3'];
  const cols = ['A', 'B', 'C', 'D', 'E'];

  const handleShelfButton = e => {
    e.preventDefault();
    const el = e.currentTarget;
    const clickedLocation = el.dataset.btn;

    if (clickedLocation === location) {
      setLocation('Library');
      shelfFilter('Library');    
    } else {
      setLocation(el.dataset.btn);
      shelfFilter(el.dataset.btn);    
    }
  }

  const floorClassName = location === 'Floor' ? 'shelf-on' : 'shelf-off';
  return (
    <div style={styles.grid}>
      <button style={styles.floorButton} className={floorClassName} data-btn='Floor' onClick={handleShelfButton}>Floor</button>
      {rows.map(row =>
        cols.map(col => {
          const btnLabel = col + row;
          const className = btnLabel === location ? 'shelf-on' : 'shelf-off';
          return (
          <button key={btnLabel} data-btn={btnLabel} onClick={handleShelfButton} style={styles.button} className={className}>
            {btnLabel}
          </button>
          );
        })
      )}
    </div>
  );
};

export default ShelfSelector;

