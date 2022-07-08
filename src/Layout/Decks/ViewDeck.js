import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteCard, readDeck, listDecks, deleteDeck } from "../../utils/api/index";

function ViewDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
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

    const deleteDeckHandler = async () => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if (result) {
            await deleteDeck(deckId);
            const newDecks = decks.filter(deck => parseInt(deck.id) !== deckId);
            setDecks(newDecks);
            history.push("/");
          }
    }

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        loadDeck();
    }, [deckId]);


    const listOfCards = cards.map((card, index) => {
        const id = card.id;
        const deleteCardHandler = async () => {
            const result = window.confirm("Are you sure you want to delete this card?");
            if (result) {
                await deleteCard(id);
                const newCards = cards.filter(card => parseInt(card.id) !== id);
                setCards(newCards);
              }
        }
        return (
            <div className="container" key={index}>
                <div className="col-auto mb-3">
                    <div key={index} className="card">
                        <div className="card-body">
                            <h5 className="card-text">{card.front}</h5>
                            <p className="card-text">{card.back}</p>
                            <Link to={`/decks/${deckId}/cards/${id}/edit`} className="btn btn-primary mr-2">Edit Card</Link>
                            <button 
                            onClick={deleteCardHandler}
                            className="btn btn-danger mx-2">
                                Delete Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    });

    return (
        <Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                   {deck.name}
                </li>
            </ol>
        </nav>
        <main className="container">
            <div className="col-auto mb-3">
                <div className="card">
                    <div className="card-body">
                        <h4>{deck.name}</h4>
                        <p className="card-text">{deck.description}</p>
                        <Link className="btn btn-primary mr-2" to={`/decks/${deckId}/edit`}>Edit Deck</Link>
                        <Link className="btn btn-primary mx-2" to={`/decks/${deckId}/study`}>Study Deck</Link>
                        <Link className="btn btn-primary mx-2" to={`/decks/${deckId}/cards/new`}>+ Add Cards</Link>
                        <button className="btn btn-danger mx-2" onClick={deleteDeckHandler}>Delete Deck</button>
                    </div>
                </div>
            </div>
            <h3 className="ml-3">Cards</h3>
            <section className="row">{listOfCards}</section>
        </main>
        </Fragment>
      );
}

export default ViewDeck;