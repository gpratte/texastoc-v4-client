import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {redirect, shouldRedirect} from "../utils/util";
import {CLIENT_URL} from "../utils/constants";

const Home = (props) => {
  const league = props.league;

  let redirectTo;
  if ((redirectTo = shouldRedirect(league))) {
    return redirect(redirectTo);
  }

  // Do not show anything about a game if there is not season.
  const showGame = league.season.data !== null;

  return (
    <div>
      <br/>
      <h1>Welcome to Texas TOC</h1>
      {league.token === null || league.token.token === null ?
        <p className={'main-p'}><Link to="/login">
          <Button variant="outline-secondary"> Login </Button> </Link>
        </p>
        : ''
      }
      <p>The stuff you are most interested in...</p>
      {
        showGame &&
        <p>
          <Link to="/season">
            <Button variant="outline-secondary">Current Season</Button>
          </Link>
          &nbsp;
          <Link to="/current-game">
            <Button variant="outline-secondary"> Game </Button>
          </Link>
        </p>
      }
      {
        !showGame &&
        <p>
          <Link to="/season">
            <Button variant="outline-secondary">Current Season</Button>
          </Link>
        </p>
      }
      <p>The stuff you'll look at from time to time...</p>
      <p>
        <Link to="/seasons">
          <Button variant="outline-secondary">&nbsp;Past Seasons&nbsp;</Button>
        </Link>
        &nbsp;
        <Link to="/league/players">
          <Button variant="outline-secondary">Players</Button>
        </Link>
      </p>
      <p>The stuff you might look at once...</p>
      <p>
        <Link to="/league/rounds">
          <Button variant="outline-secondary">Rounds</Button>
        </Link>
        &nbsp;
        <Link to="/league/points">
          <Button variant="outline-secondary">Points</Button>
        </Link>
        &nbsp;
        <Link to="/league/faq">
          <Button variant="outline-secondary">FAQ</Button>
        </Link>
      </p>
      <p>If the app does not seem to be working right...</p>
      <p>
        <Button variant="outline-secondary" href={CLIENT_URL}>
          Reload
        </Button>
      </p>

    </div>
  )
}

export default Home;
