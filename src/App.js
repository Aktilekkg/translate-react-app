import React, { useState, useEffect } from "react";
import axios from 'axios'

// const axios= require('axios').default
function App() {
  const [options, setOptions] = useState([])
  const [to, setTo] = useState('en')
  const [from, setFrom] = useState('en')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  const translate_url = 'https://libretranslate.de/translate'
  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post(translate_url, params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data);
      setOutput(res.data.translatedText)
    })
  }

  // curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"
  const url = 'https://libretranslate.de/languages'
  useEffect(() => {
    axios.get(url,
      { headers: { 'accept': 'application/json' }, }).then(res => {
        console.log(res);
        setOptions(res.data)
      })
  }, [])
  console.log(options);
  return (
    <div className="App">
      <div className="text">
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.id} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.id} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
