import { useState } from 'react';
import useSpeechRecognition from './hooks/useSpeechRecognition';

const aslSigns = ['🤟', '👍', '👋', '👏', '✌️', '👌'];

export default function App() {
  const [typedSigns, setTypedSigns] = useState('');
  const [translation, setTranslation] = useState('');

  const { transcript, listening, startListening } = useSpeechRecognition();

  const addSign = (sign) => {
    setTypedSigns((prev) => prev + sign);
  };

  const clearSigns = () => {
    setTypedSigns('');
    setTranslation('');
  };

  const translateSigns = () => {
    const map = {
      '🤟': 'I',
      '👍': 'L',
      '👋': 'O',
      '👏': 'V',
      '✌️': 'E',
      '👌': 'Y',
    };

    let text = '';
    for (let ch of typedSigns) {
      text += map[ch] || '?';
    }
    setTranslation(text);
  };

  const autoSignFromVoice = () => {
    const map = {
      i: '🤟',
      love: '👏',
      you: '👌',
      like: '👍',
      hello: '👋',
      peace: '✌️',
    };

    const words = transcript.toLowerCase().split(' ');
    const result = words.map((word) => map[word] || '❓').join('');
    setTypedSigns(result);
  };

  const saveTranslationToFile = () => {
  const fileContent = `Signs: ${typedSigns}\nTranslation: ${translation}`;
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'asl_translation.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
};


  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: 'auto' }}>
      <h1>Lily ASL Web App</h1>

      {/* Sign Keyboard */}
      <h2>Sign Keyboard</h2>
      <div style={{ display: 'flex', gap: 15, fontSize: 40, cursor: 'pointer' }}>
        {aslSigns.map((sign, i) => (
          <span key={i} onClick={() => addSign(sign)} role="button" aria-label={`Sign ${sign}`}>
            {sign}
          </span>
        ))}
      </div>

      {/* Control Buttons */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={clearSigns}
          style={{
            padding: '8px 16px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          Clear
        </button>
        <button
          onClick={translateSigns}
          style={{
            padding: '8px 16px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          Translate to Text
        </button>
        <button
          onClick={autoSignFromVoice}
          style={{
            padding: '8px 16px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
          }}
        >
          Translate Voice to Signs
        </button>
      </div>

      {/* Typed Signs */}
      <h3 style={{ marginTop: 30 }}>Typed Signs:</h3>
      <div
        style={{
          minHeight: 50,
          fontSize: 36,
          border: '1px solid #ccc',
          padding: 10,
          whiteSpace: 'pre-wrap',
        }}
      >
        {typedSigns}
      </div>

      <button
  onClick={saveTranslationToFile}
  style={{
    padding: '8px 16px',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 15
  }}
>
  💾 Save Translation
</button>


      {/* Translation Output */}
      <h3 style={{ marginTop: 20 }}>Translation Output:</h3>
      <textarea
        readOnly
        value={translation}
        rows={3}
        style={{ width: '100%', fontSize: 24, padding: 10, resize: 'none' }}
      />

      {/* Voice Input */}
      <h3 style={{ marginTop: 30 }}>Voice Input:</h3>
      <button
        onClick={startListening}
        style={{ padding: '8px 16px', fontSize: 16, cursor: 'pointer', borderRadius: 5 }}
      >
        🎤 {listening ? 'Listening...' : 'Start Voice Input'}
      </button>
      <div style={{ marginTop: 10, fontSize: 20 }}>
        <strong>Spoken:</strong> {transcript || 'Nothing yet'}
      </div>
    </div>
  );
}
