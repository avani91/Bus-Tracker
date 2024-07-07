import React, { useState } from 'react';

export default function App() {
  const [arr, setArray] = useState(['Bus-1', 'Bus-2']);
  const [input, setInput] = useState(arr[0]);
  const [inputButton, setInputButton] = useState(arr[1]);
  const changethis = () => {
    let temp = [];
    temp.push(arr[1], arr[0]);
    console.log(arr);
    setArray(temp);
    setInput(arr[0]);
    setInputButton(arr[1]);
  };

 // return (<div id="main">
 //     <h1 id="marco-polo">{input}</h1>
 //     <button id="marco-polo-toggler" onClick={changethis}>
 //       {inputButton}
 //     </button>
 //   </div>);
}
