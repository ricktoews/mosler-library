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
    backgroundColor: 'gray',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8em'
  },
  floorButton: {
    gridRow: 'span 3',
    backgroundColor: 'gray',
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
  const rows = ['1', '2', '3'];
  const cols = ['A', 'B', 'C', 'D', 'E'];

  const handleShelfButton = e => {
    e.preventDefault();
    const el = e.currentTarget;

    shelfFilter(el.dataset.btn);    
  }

  return (
    <div style={styles.grid}>
      <button style={styles.floorButton} data-btn='Floor' onClick={handleShelfButton}>Floor</button>
      {rows.map(row =>
        cols.map(col => (
          <button key={col + row} data-btn={col + row} onClick={handleShelfButton} style={styles.button}>
            {col + row}
          </button>
        ))
      )}
    </div>
  );
};

export default ShelfSelector;

