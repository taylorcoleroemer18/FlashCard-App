import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        loadDeck();
    }, [deckId]);

    const handleNewCard = (event) => {
       event.preventDefault();
       const newCard = { front, back };
       async function updateCard() {
        const response = await createCard(deckId,newCard);
        setCards([...cards, response])
        setFront('');
        setBack('');
       }
        updateCard();
      }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                      Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    {deck.name}
                </li>
                <li className="breadcrumb-item">
                    Add Card
                </li>
            </ol>
        </nav>
            <h2>Add Card</h2>
            <CardForm 
                handleNewCard={handleNewCard} 
                front={front} 
                setFront={setFront} 
                back={back} 
                setBack={setBack} 
            />
        </Fragment>
    )
}

export default AddCard;