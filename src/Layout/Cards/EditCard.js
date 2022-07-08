import React, { Fragment, useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
    const history= useHistory();
    const {deckId, cardId} = useParams();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const [updatedFront, setUpdatedFront] = useState('');
    const [updatedBack, setUpdatedBack] = useState('');
    
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId);
            setUpdatedFront(response.front);
            setUpdatedBack(response.back);
        }
        loadCard();
    }, [cardId]);
    

    const filteredCards = cards.filter(card => parseInt(card.id) !== cardId);
    const handleCardUpdate = (event) => {
        event.preventDefault();
        const newCard = {id: cardId, front: updatedFront, back: updatedBack, deckId: deckId};
        async function update() {
            const updatedCard = await updateCard(newCard);
            setCards([...filteredCards, updatedCard]);
            history.push(`/decks/${deckId}`);
        }
        update();
       }


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
                <li className="breadcrumb-item">
                    Edit Card {cardId}
                </li>
                
            </ol>
        </nav>
            <h2>Edit Card</h2>
            <CardForm 
                handleCardUpdate={handleCardUpdate} 
                updatedFront={updatedFront}
                setUpdatedFront={setUpdatedFront} 
                updatedBack={updatedBack} 
                setUpdatedBack={setUpdatedBack}
                deckId={deckId}
            />
        </Fragment>
    )
}

export default EditCard;