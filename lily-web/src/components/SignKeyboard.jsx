import React from 'react';

const aslSigns = ['🤟', '👍', '👋', '👏', '✌️', '👌'];

export default function SignKeyboard({ onSignClick }) {
  return (
    <div style={{ display: 'flex', gap: 15, fontSize: 40, cursor: 'pointer' }}>
      {aslSigns.map((sign, index) => (
        <span key={index} onClick={() => onSignClick(sign)} role="button" aria-label={`Sign ${sign}`}>
          {sign}
        </span>
      ))}
    </div>
  );
}
