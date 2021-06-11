import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from './Card'

let baseURL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([])
  const [toggleTimer, setToggleTimer] = useState(false)
  const timerId = useRef();

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${baseURL}/new/shuffle/`);
      setDeck(res.data);
    }
    getDeck();
  }, [setDeck])



  useEffect(() => {
    async function drawCard() {
      let deckId = deck.deck_id;
      const draw = await axios.get(`${baseURL}/${deckId}/draw/`);

      console.log(draw.data.remaining)

      if (draw.data.remaining === 0) {
        stopTimer();
        throw new Error('Error: no cards remaining!')
      } else {
        setCard(draw.data.cards[0])
      }
    }

    if (toggleTimer) {
      timerId.current = setInterval(() => {
        drawCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerId.current)
    }
  }, [toggleTimer])

  const stopTimer = () => {
    clearInterval(timerId.current)
  }
  
  const handleCardDraw = async () => {
    setToggleTimer(!toggleTimer)
  };

  return (
    <>
        <button onClick={handleCardDraw}>{toggleTimer ? "Stop Drawing!" : "Start Drawing!"}</button> 
        <Card cardImg={card.image}/>
    </>
  )
};

export default Deck;