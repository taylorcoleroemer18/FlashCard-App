import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const history = useHistory();
  const [ decks, setDecks ] = useState([]);
  
  //set decks, catch error
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(() => response);
      } catch (error) {
        console.log(error)
      }
    }
    loadDeck();
    return () => abortController.abort();
  },[]);

  //create delete handler
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(id);
      history.push("/");
    } else {
      history.push("/");
    }
  };
  //return jsx with proper handlers
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`/decks/new`)}>
          Create Deck
      </button>
      <ul>
        {decks.map((deck, index) => (
          <div className="container" key={index}>
            <li key={deck.id}>
              <h3 className="card-title">{deck.name}</h3>
              <p>{deck.cards.length} cards</p>
              <p className="card-body">{deck.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => history.push(`/decks/${deck.id}`)}>
                  View
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deck.id}/study`)}>
                  Study
              </button>
              <button
                className="btn btn-danger float-right"
                onClick={() => deleteHandler(deck.id)}>
                  Delete
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;