import React, { Fragment, useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api/index";

function EditDeck() {
  const history= useHistory();
  const {deckId} = useParams();
  const [deck, setDeck] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
    
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setUpdatedName(response.name);
            setUpdatedDescription(response.description);
        }
        loadDeck();
    }, [deckId]);


    const handleDeckUpdate = (event) => {
        event.preventDefault();
        const newDeck = {
            id: deckId, 
            name: updatedName, 
            description: updatedDescription
        };
        
        async function update() {
            await updateDeck(newDeck);
            history.push(`/`)
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
                        Edit Deck
                    </li>
                    
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form className="form-group" onSubmit={handleDeckUpdate}>
                <label>Name</label>
                <input 
                    className="form-control"
                    type="text" 
                    value={updatedName}
                    placeholder={updatedName}
                    onChange={(event) => setUpdatedName(event.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={updatedDescription}
                    onChange={(event) => setUpdatedDescription(event.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deckId}`)}>
                    Cancel
                </button>
                <button 
                className="btn btn-primary" 
                type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    )
}

export default EditDeck;