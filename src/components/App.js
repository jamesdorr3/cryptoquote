import React, { useState, useEffect } from "react";
import uuid from "uuid";

import "./App.scss";
import Letter from "./Letter.js";
import { isLetter } from "../utils";

const dummyQuote = "To be or not to be, that is the question.";

const abcs = "abcdefghijklmnopqrstuvwxyz";

const blankMapping = abcs.split("").map((letter) => ({
  answer: letter.toUpperCase(),
  encryption: "",
  id: uuid(),
  guess: "",
}));

const randomNumber = (number) => Math.round(Math.random() * (number - 1));

const randomLetter = (options, forbiddenLetter) => {
  const newLetter = options[randomNumber(options.length)];
  if (newLetter === forbiddenLetter) {
    return randomLetter(options, forbiddenLetter);
  }
  return newLetter;
};

const App = () => {
  const [quote, setQuote] = useState("");
  const [mapping, setMapping] = useState([]);

  const makeMapping = () => {
    let bigAbcs = abcs.toUpperCase().split("");
    const newMapping = blankMapping.map((letterInfo) => {
      let newLetter;
      if (letterInfo.answer === "Y" && bigAbcs.includes("Z")) {
        newLetter = "Z";
      } else {
        newLetter = randomLetter(bigAbcs, letterInfo.answer);
      }
      bigAbcs = bigAbcs.filter((x) => x !== newLetter);
      return {
        ...letterInfo,
        encryption: newLetter,
      };
    });
    setMapping(newMapping);
  };

  useEffect(() => {
    setQuote(dummyQuote.toUpperCase());
    makeMapping();
  }, []);

  useEffect(()=>{
    if(mapping[0] && mapping.every((x) => { // quote doesn't use full alphabet
      console.log(x);
      return x.answer === x.guess
    })){
      console.log('yep!')
    }
  })

  const handleChange = ({ target: { name, value } }) => {
    const info = mapping.find((x) => x.id === name);
    if (!info) return;
    info.guess = value.toUpperCase();
    const newMapping = mapping.filter((x) => x.id !== name);
    setMapping([...newMapping, info]);
  };

  return (
    <div className="App">
      <div>{dummyQuote.toUpperCase()}</div>
      <div>
        {quote.split(" ").map((word) => (
          <div className="word" key={uuid()}>
            {word.split("").map((character) => (
              <span key={uuid()}>
                {!isLetter(character) ? (
                  <span>{character}</span>
                ) : (
                  <Letter
                    letter={character}
                    mapping={mapping}
                    handleChange={handleChange}
                  />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
