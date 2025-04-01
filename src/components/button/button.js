import React from 'react';

import * as styles from '../../pages/styles/Button.module.css';

const Button = ({ text, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
