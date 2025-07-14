import React from 'react';
import css from './SignKeyboard.module.css';

const aslSigns = ['🤟', '👍', '👋', '👏', '✌️', '👌'];

export default function SignKeyboard({ onSignClick }) {
  return (
    <div className={css.keyboard}>
      {aslSigns.map((sign, index) => (
        <div
          key={index}
          className={css.key}
          onClick={() => onSignClick(sign)}
          role="button"
          aria-label={`Sign ${sign}`}
        >
          {sign}
        </div>
      ))}
    </div>
  );
}
