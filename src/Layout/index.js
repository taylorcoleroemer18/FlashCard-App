import React, { Fragment } from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Decks/DeckList";
import ViewDeck from "./Decks/ViewDeck";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./Decks/CreateDeck";
import AddCard from "./Cards/AddCard";
import EditDeck from "./Decks/EditDeck";
import EditCard from "./Cards/EditCard";

function Layout() {

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;