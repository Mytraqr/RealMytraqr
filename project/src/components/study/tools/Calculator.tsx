import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 h-6">{equation}</div>
        <div className="text-3xl font-mono">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': handleEquals(); break;
                case '+': case '-': case '×': case '÷':
                  handleOperator(btn === '×' ? '*' : btn === '÷' ? '/' : btn);
                  break;
                default: handleNumber(btn);
              }
            }}
            className={`p-4 text-xl rounded-lg ${
              btn === '=' 
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : isNaN(Number(btn)) && btn !== '.'
                ? 'bg-gray-200 dark:bg-gray-600'
                : 'bg-white dark:bg-gray-700'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}