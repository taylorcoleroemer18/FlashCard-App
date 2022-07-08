import React from "react";
import { useHistory, useParams } from "react-router";

function CardForm({handleCardUpdate, updatedFront, setUpdatedFront, updatedBack, setUpdatedBack, deckId, handleNewCard, front, setFront, back, setBack}) {
    const params = useParams();
    const history = useHistory();

    if (params.cardId) {
        return (
            <form className="form-group" onSubmit={handleCardUpdate}>
                <label>Front</label>
                <textarea   
                    className="form-control"
                    value={updatedFront}
                    onChange={(event) => setUpdatedFront(event.target.value)}
                ></textarea>
                
                <label>Back</label>
                <textarea
                    className="form-control"
                    value={updatedBack}
                    onChange={(event) => setUpdatedBack(event.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary mr-2 mt-2"
                onClick={() => history.push(`/decks/${deckId}`)}>
                  Cancel
                </button>

                <button 
                className="btn btn-primary mx-2 mt-2" 
                type="submit">
                    Submit
                </button>
            </form>
        )
    } else {
        return (
            <form className="form-group" onSubmit={handleNewCard}>
                <label>Front</label>
                <textarea
                    className="form-control"
                    value={front}
                    onChange={(event) => setFront(event.target.value)}
                ></textarea>
                
                <label>Back</label>
                <textarea
                    className="form-control"
                    value={back}
                    onChange={(event) => setBack(event.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary mr-2 mt-2"
                onClick={() => history.push(`/decks/${deckId}`)}
                >Cancel</button>
                <button 
                className="btn btn-primary mx-2 mt-2" 
                type="submit">
                    Submit
                </button>
            </form>
        )
    }
}

export default CardForm;