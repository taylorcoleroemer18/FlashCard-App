import React, {Fragment, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNewDeck = (event) => {
       event.preventDefault();
       const newDeck = { name, description };
       async function updateDeck() {
           const response = await createDeck(newDeck);
           history.push(`/decks/${response.id}`);
       }
       updateDeck();
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
                    Create Deck
                </li>
            </ol>
        </nav>
            <h2>Create Deck</h2>
            <form className="form-group" onSubmit={handleNewDeck}>
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary my-2 mr-2"
                onClick={() => history.push("/")}>
                  Cancel
                </button>
                
                <button 
                className="btn btn-primary my-2" 
                type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    )
}

export default CreateDeck;