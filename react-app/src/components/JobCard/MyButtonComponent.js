import React from 'react';
import styles from './MyButtonAndDropdown.module.css';

export default function Button({ children, onClick }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
