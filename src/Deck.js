import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './Card'

let baseURL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([])

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
      setDeck(res.data);
    }
    getDeck();
  }, [])

  const getCard = async () => {
    let deckId = deck.deck_id;
    const res = await axios.get(`${baseURL}/${deckId}/draw/`);
    setCard(res.data.cards[0])
      console.log(res.data.cards[0])
  }

  return (
    <>
        <button onClick={getCard}>Gimme a card!</button>
        <Card cardImg={card.image}/>
        
    </>
  )
};

export default Deck;