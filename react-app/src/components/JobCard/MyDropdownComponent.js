import React from 'react';
import styles from './MyButtonAndDropdown.module.css';

export default function Dropdown({ children }) {
  return (
    <div className={styles.dropdown} >
      {children}
    </div>
  );
}
