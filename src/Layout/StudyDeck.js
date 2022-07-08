import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {readDeck} from "../utils/api/index";

/**
 * Display given cards to allow user to study.
 */
function StudyDeck() {
    const history = useHistory();
    const {deckId} = useParams();

    const [showFront, setShowFront] = useState(true);
    const [currentCardNum, setCurrentCardNum] = useState(0);
    const [currentDeck, setCurrentDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadCurrentDeck() {
            const response = await readDeck(deckId);
            setCurrentDeck(response);
            setCards(response.cards);
        }
        loadCurrentDeck();
    }, [deckId]);

    function flip() {
        setShowFront(current => !current);
    }

    function next() {
        if (currentCardNum + 1 < cards.length) {
            setCurrentCardNum(current => current + 1);
            setShowFront(true);
        } else {
            const result = window.confirm("Restart cards? Click 'cancel' to return to the home page.");
            if (result) {
                setCurrentCardNum(0);
                setShowFront(true);
            } else {
                history.push("/");
            }
        }
    }
    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        {currentDeck.name}
                    </li>
                    <li className="breadcrumb-item">
                        Study
                    </li>
                </ol>
            </nav>
            {cards.length < 3 && (
                <Fragment>
                    <h2>Study: {currentDeck.name}</h2>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
                </Fragment>
            )}
            {cards.length >= 3 && (
                <div>
                    <h2>Study: {currentDeck.name}</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card {currentCardNum + 1} of {cards.length}</h5>
                            <p className="card-text">{(showFront) ? `${cards[currentCardNum].front}` : `${cards[currentCardNum].back}`}</p>
                            <button className="btn btn-secondary" onClick={flip}>Flip</button> &nbsp;
                            {(showFront) ? " " : <button className="btn btn-primary" onClick={next}>Next</button>}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default StudyDeck;