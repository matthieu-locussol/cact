import React from 'react';
import Button from './Button';
import { API_KEY } from './Api';

import './Quote.css';

const axios = require('axios');

const theCatAPI = axios.create({
  baseURL: 'https://api.thecatapi.com/',
  timeout: 1000,
  headers: {
    'X-API-KEY': API_KEY,
  }
});

function App() {
  const randomNumber = Math.floor(Math.random() * 50) + 1;

  const [url, setUrl] = React.useState("images/" + randomNumber + ".svg")
  const [text, setText] = React.useState("Start by requesting a new Cact !")
  const [isLoading, setIsLoading] = React.useState(false);

  const onClick = (event: any) => {
    if(!isLoading) {
      setIsLoading(true);

      theCatAPI.get('v1/images/search?mime_types=jpg,png')
      .then(function (response: any) {
        setUrl(response.data[0].url);

        axios.get('https://catfact.ninja/fact')
        .then(function (response: any) {
          setText(response.data.fact);
          setIsLoading(false);
        })
        .catch(function (error: any) {
          setText("Sorry, an error has occured ! Try again !");
          setIsLoading(false);
        })
      })
      .catch(function (error: any) {
        setText("Sorry, an error has occured ! Try again !");
        setIsLoading(false);
      })
    }
  }

  return (
    <div className="App">
      <div>
        <div className="picture">
          <img className="circular--square" src={url} alt="" />
        </div>
        <p className="quoteText">{text}</p>
        <Button
          isLoading={isLoading}
          onClick={onClick}
        >
          <span role="img" aria-label="Nyan">Nyan 🐱</span>
        </Button>
      </div>
    </div>
  );
}

export default App;
