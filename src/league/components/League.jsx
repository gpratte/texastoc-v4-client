import React from 'react';
import './league.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link, Route, Switch} from 'react-router-dom';
import Error from './Error'
import NewVersion from './NewVersion'
import Home from '../../home/Home'
import Login from '../../login/components/Login'
import ForgotPassword from '../../login/components/ForgotPassword'
import ForgotPasswordCode from '../../login/components/ForgotPasswordCode'
import Season from '../../season/components/Season'
import PastSeasons from '../../past-seasons/PastSeasons'
import Rounds from './Rounds'
import Points from './Points'
import Faq from './Faq'
import NewSeason from '../../season/components/NewSeason'
import CurrentGame from '../../current-game/components/CurrentGame'
import NewGame from '../../current-game/components/NewGame'
import LeaguePlayers from './LeaguePlayers'
import Footer from'./Footer'
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast'
import {isLoggedIn, shouldShowGame} from "../../utils/util";
import {checkDeployedVersion, isNewVersion} from "./../leagueClient";

class League extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showNotification: false,
      notificationShown: false
    };
  }

  toggleOffShowNotification() {
    this.setState({showNotification: false, notificationShown: true})
  }

  componentDidUpdate() {
    if (isNewVersion() && !this.state.notificationShown) {
      this.setState({showNotification: true, notificationShown: true})
    }
  }


  render() {
    checkDeployedVersion();
    const league = this.props.league;

    // Do not show anything about a game if there is not season.
    const showGame = shouldShowGame(league);

    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Col>
            <Link to="/home" className={'nav-home'}>
              <i className="fas fa-home"/>
            </Link>
          </Col>
          <Col>
            <div className="float-right">
              {
                isNewVersion() &&
                <Dropdown className={'nav-bar-right nav-home'}>
                  <Dropdown.Toggle className={'nav-home'} variant="link" id="dropdown-basic">
                    <i className="far fa-bell"/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/new-version">
                        <Button variant="link">New Version Available</Button>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }

              <Dropdown className={'nav-bar-right'}>
                <Dropdown.Toggle className={'nav-home'} variant="link" id="dropdown-basic">
                  <i className="fas fa-user-alt"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/login">
                      <Button variant="link">Log In/Out</Button>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className={'nav-bar-right'}>
                <Dropdown.Toggle className={'nav-home'} variant="link" id="dropdown-basic">
                  <i className="fas fa-bars"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link exact to="/home">
                      <Button variant="link">Home</Button>
                    </Link>
                  </Dropdown.Item>
                  {
                    isLoggedIn(league) && showGame &&
                    <Dropdown.Item>
                      <Link exact to="/game/new">
                        <Button variant="link">New Game</Button>
                      </Link>
                    </Dropdown.Item>
                  }
                  {
                    isLoggedIn(league) && showGame &&
                    <Dropdown.Item>
                      <Link exact to="/season/new">
                        <Button variant="link">New Season</Button>
                      </Link>
                    </Dropdown.Item>
                  }
                </Dropdown.Menu>
              </Dropdown>

            </div>
          </Col>
        </Navbar>
        <Container className="main-view">
          <Row className="justify-content-center text-center gp">
            <Col>
              <Error league={league}/>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col>
              {
                this.state.showNotification &&
                <Toast show={this.state.showNotification}
                       onClose={() => this.toggleOffShowNotification()}
                       className={'notification-alert'}>
                  <Toast.Header>
                    <strong className="mr-auto">New Notification</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Click/press the bell icon on the top bar.
                  </Toast.Body>
                </Toast>
              }
            </Col>
          </Row>
          <Row className="justify-content-center text-center gp">
            <Col>
              <Switch>
                <Route exact path='/'>
                  <Home league={league}/>
                </Route>
                <Route path='/home'>
                  <Home league={league}/>
                </Route>
                <Route exact path='/login'>
                  <Login league={league}/>
                </Route>
                <Route exact path='/login/forgot'>
                  <ForgotPassword league={league}/>
                </Route>
                <Route exact path='/login/code'>
                  <ForgotPasswordCode league={league}/>
                </Route>
                <Route exact path='/season'>
                  <Season league={league}/>
                </Route>
                <Route exact path='/seasons'>
                  <PastSeasons/>
                </Route>
                <Route exact path='/league/rounds'>
                  <Rounds/>
                </Route>
                <Route exact path='/league/points'>
                  <Points/>
                </Route>
                <Route exact path='/league/faq'>
                  <Faq/>
                </Route>
                <Route path='/season/new'>
                  <NewSeason league={league}/>
                </Route>
                <Route path='/game/new'>
                  <NewGame league={league}/>
                </Route>
                <Route path='/current-game'>
                  <CurrentGame league={league}/>
                </Route>
                <Route path='/league/players'>
                  <LeaguePlayers league={league}/>
                </Route>
                <Route path='/new-version'>
                  <NewVersion/>
                </Route>
              </Switch>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col>
              <Footer/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default League
