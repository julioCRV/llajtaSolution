import React, { useState } from 'react';

function InputConLimiteDeCaracteres({ maxLength }) {
  const [texto, setTexto] = useState('');

  const handleChange = (event) => {
    const inputText = event.target.value;

    // Verifica si el texto supera el límite de caracteres
    if (inputText.length <= maxLength) {
      setTexto(inputText);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={texto}
        onChange={handleChange}
        placeholder={`Máximo ${maxLength} caracteres`}
      />
      <div style={{ marginLeft: '10px' }}>
        {texto.length}/{maxLength}
      </div>
    </div>
  );
}

export default InputConLimiteDeCaracteres;