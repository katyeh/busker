import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeContainer from './components/home/HomeContainer';
// import HomeContainer from './components/home/HomeContainer';
import Player from './components/player/Player';
import ArtistProfile from './components/ArtistProfile'
import Artist from './components/Artists'
import Example from './components/Example'



function RoutesContainer({authenticated, setAuthenticated}) {


  return (
    <>
      <NavBar setAuthenticated={setAuthenticated}/>
      <Player/>
      <Switch>
        <Route
          path="/example"
          exact={true}
          authenticated={authenticated}
        >
          <Example/>
        </Route>
        <Route
          path="/"
          exact={true}
          authenticated={authenticated}
        >
          <HomeContainer/>
        </Route>
        <Route path="/artists" exact={true}>
          <Artist />
        </Route>
        <Route path="/artists/:id" exact={true}>
          <ArtistProfile />
        </Route>
      </Switch>
    </>
  )

}


export default RoutesContainer;
