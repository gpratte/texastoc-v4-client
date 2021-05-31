import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {login} from '../loginClient'
import leagueStore from "../../league/leagueStore";
import {LOGGED_OUT} from "../loginActions";
import {redirect, shouldRedirect} from "../../utils/util";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

class Login extends React.Component {

  logout = () => {
    leagueStore.dispatch({type: LOGGED_OUT, token: null})
  }

  login = (e) => {
    e.preventDefault();
    login(e.target.elements.emailId.value, e.target.elements.passwordId.value)
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league, true))) {
      return redirect(redirectTo);
    }
    const league = this.props.league;
    if (league.token === null || league.token.token === null) {
      return (
        <div>
          <br/>
          <h2>Please Log In</h2>
          <br/>
          <Form onSubmit={this.login}>
            <Form.Group>
              <Form.Control type="email" id={'emailId'} placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" id={'passwordId'} placeholder="Password" />
            </Form.Group>
            {
              !league.waiting &&
              <Button variant="primary" type="submit">
                Submit
              </Button>
            }
            {
              league.waiting &&
              <Row className="justify-content-center text-center gp">
                <Col>
                  <Button variant="primary" disabled={true}>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                  </Button>
                </Col>
              </Row>
            }

          </Form>
          <p className={'main-p'}><Link to="/login/forgot">
            <Button variant="link">Forgot Password</Button> </Link>
          </p>
        </div>
      );
    }

    return (
      <div>
        <br/>
        <h2>You are Logged In</h2>
        <p className={'main-p'}><Link to={"/login"}>
          <Button variant="outline-secondary" onClick={() => this.logout() }> Log Out </Button>
        </Link>
        </p>
      </div>
    )
  }
}

export default Login
