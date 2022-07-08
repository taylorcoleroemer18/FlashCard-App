import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api/index";

function DeckList() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDecks() {
          const response = await listDecks(abortController.signal);
          setDecks(response);
        }
    
        loadDecks();
        
        return () => abortController.abort();
    }, []);

    const deleteHandler = async (id) => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if (result) {
            await deleteDeck(id);
            const newDecks = decks.filter(deck => parseInt(deck.id) !== id);
            setDecks(newDecks);
            history.push("/");
          }
          history.push("/");
    }
    

    const listOfDecks = decks.map((deck, index) => (
        <div className="container" key={index}>
            <div className="col-auto mb-3">
                <div key={index} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6>{deck.cards.length} cards</h6>
                        <p className="card-text">{deck.description}</p>
                        <button 
                        className="btn btn-primary mr-2"
                        onClick={() => history.push(`/decks/${deck.id}`)}>
                            View
                        </button>
                        <button 
                        className="btn btn-primary mx-2"
                        onClick={() => history.push(`/decks/${deck.id}/study`)}>
                            Study
                        </button>
                        <button 
                        className="btn btn-danger mx-2"
                        onClick={() => deleteHandler(deck.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    ));

    return (
        <main className="container">
            <div>
                <button
                className="btn btn-secondary ml-3 mb-3"
                onClick={() => history.push("/decks/new")}>
                    + Create Deck
                </button>
            </div>
          <section className="row">{listOfDecks}</section>
        </main>
      );
}

export default DeckList;